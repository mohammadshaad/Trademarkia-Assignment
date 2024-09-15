import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import TopFilter from "@/components/TopFilter";
import SideFilter from "@/components/SideFilter";
import ErrorPopup from "@/components/ErrorPopup"; // Import the new ErrorPopup component
import { SearchResult } from '@/types/SearchResult';
import { ApiResponseItem } from '@/types/ApiResponseItem';
import { format, fromUnixTime, set } from 'date-fns';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSideFilterVisible, setSideFilterVisible] = useState(true);
  const [owners, setOwners] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [lawFirms, setLawFirms] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [attorneys, setAttorneys] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [error, setError] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState('');

  const handleToggleSideFilter = () => {
    setSideFilterVisible(prev => !prev);
  };

  const handleFilterChange = useCallback((filters: { [key: string]: string[] }) => {
    console.log('Filters Changed:', filters);
    setSelectedFilters(filters);
    filterResults(filters);
  }, [searchQuery, sortOrder]);


  const handleSearchResults = (
    data: SearchResult[],
    query: string,
    ownersList?: { name: string; name_cleaned: string; count: number }[],
    lawFirmsList?: { name: string; name_cleaned: string; count: number }[],
    attorneysList?: { name: string; name_cleaned: string; count: number }[],
  ) => {
    setSearchResults(data);
    setSearchQuery(query);
    setOwners(ownersList || []);
    setLawFirms(lawFirmsList || []);
    setAttorneys(attorneysList || []);
  };

  const filterResults = (filters: { [key: string]: string[] }) => {
    let filteredResults = [...searchResults];

    if (searchQuery) {
      filteredResults = filteredResults.filter(result =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    for (const [key, values] of Object.entries(filters)) {
      if (values.length > 0) {
        filteredResults = filteredResults.filter(result => {
          const keyTyped = key as keyof SearchResult;
          return values.includes(result[keyTyped]?.toString().toLowerCase());
        });
      }
    }

    if (sortOrder === 'asc') {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      filteredResults.sort((a, b) => b.name.localeCompare(a.name));
    }

    setSearchResults(filteredResults);
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
    filterResults(selectedFilters);
  };

  // pages/index.tsx
  const handleSearch = async (query: string) => {
    const data = {
      input_query: query,
      input_query_type: "",
      sort_by: "default",
      status: selectedFilters.Status || [], 
      exact_match: false,
      date_query: false,
      owners: selectedFilters.Owners || [],
      attorneys: selectedFilters.Attorneys || [],
      law_firms: selectedFilters.LawFirms || [],
      mark_description_description: [],
      classes: [],
      page: 1,
      rows: 10,
      sort_order: sortOrder,
      states: [],
      counties: []
    };

    try {
      const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        setErrorMessages('No results found for your query.');
        throw new Error('No results found for your query.');
      }

      if (!response.ok) {
        setErrorMessages(`Failed to fetch data`);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();

      const formattedMarkResults = result.body.hits.hits.map((item: ApiResponseItem) => ({
        name: item._source.mark_identification,
        company: item._source.current_owner,
        markId: item._source.registration_number,
        description: item._source.mark_description_description.join(', '),
        registration_date: item._source.registration_date ? format(fromUnixTime(item._source.registration_date), 'd MMM yyyy') : 'N/A',
        status_date: item._source.status_date ? format(fromUnixTime(item._source.status_date), 'd MMM yyyy') : 'N/A',
        status_type: item._source.status_type,
        renewal_date: item._source.renewal_date ? format(fromUnixTime(item._source.renewal_date), 'd MMM yyyy') : 'N/A',
        filing_date: item._source.filing_date ? format(fromUnixTime(item._source.filing_date), 'd MMM yyyy') : 'N/A',
        class: item._source.class_codes.join(', '),
        law_firm: item._source.law_firm,
        law_firm_cleaned: item._source.law_firm_cleaned,
        attorney_name: item._source.attorney_name,
        attorney_name_cleaned: item._source.attorney_name_cleaned,
        current_owner: item._source.current_owner,
        current_owner_cleaned: item._source.current_owner_cleaned,
      }));

      const owners = result.body.aggregations.current_owners?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: formattedMarkResults.find((item: typeof formattedMarkResults[0]) => item.current_owner_cleaned === bucket.key)?.current_owner,
        name_cleaned: bucket.key,
        count: bucket.doc_count,
      }));

      const lawFirms = result.body.aggregations.law_firms?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: formattedMarkResults.find((item: typeof formattedMarkResults[0]) => item.law_firm_cleaned === bucket.key)?.law_firm,
        name_cleaned: bucket.key,
        count: bucket.doc_count,
      }));

      const attorneys = result.body.aggregations.attorneys?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: formattedMarkResults.find((item: typeof formattedMarkResults[0]) => item.attorney_name_cleaned === bucket.key)?.attorney_name,
        name_cleaned: bucket.key,
        count: bucket.doc_count,
      }));

      handleSearchResults(formattedMarkResults, query, owners, lawFirms, attorneys);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };


  const handleCloseErrorPopup = () => {
    setError(null);
  };

  return (
    <div className="w-full">
      {error && <ErrorPopup message={errorMessages} onClose={handleCloseErrorPopup} />}
      <Navbar onSearch={handleSearch} />
      <TopFilter
        onFilterClick={handleToggleSideFilter}
        isSideFilterVisible={isSideFilterVisible}
        searchQuery={searchQuery}
        resultsCount={searchResults.length}
        onSortChange={handleSort}
      />
      <div className="flex items-start justify-between w-full px-10 pb-20">
        <Table searchResults={searchResults} />
        {isSideFilterVisible && (
          <SideFilter
            owners={owners}
            lawFirms={lawFirms}
            attorneys={attorneys}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>
    </div>
  );
}
