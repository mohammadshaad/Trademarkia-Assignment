import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TableListView from "@/components/Table/ListView";
import TableGridView from "@/components/Table/GridView";
import TopFilter from "@/components/TopFilter";
import SideFilter from "@/components/SideFilter";
import ErrorPopup from "@/components/ErrorPopup";
import { SearchResult } from '@/types/SearchResult';
import { ApiResponseItem } from '@/types/ApiResponseItem';
import { format, fromUnixTime } from 'date-fns';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Default query can be set here
  const [isSideFilterVisible, setSideFilterVisible] = useState(true);
  const [owners, setOwners] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [lawFirms, setLawFirms] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [attorneys, setAttorneys] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  // useEffect(() => {
  //   handleSearch('trademarkia'); // Replace 'default query' with your initial query if needed
  // }, []);

  const handleToggleSideFilter = () => {
    setSideFilterVisible(prev => !prev);
  };

  const handleFilterChange = useCallback(async (filters: { [key: string]: string[] }) => {
    setSelectedFilters(filters);
    if (searchQuery) { // Only fetch results if there's a search query
      await fetchResults(filters);
    } else {
      setSearchResults([]);
      setOwners([]);
      setLawFirms([]);
      setAttorneys([]);
      setError(null);
    }
  }, [searchQuery, sortOrder]);

  const fetchResults = async (filters: { [key: string]: string[] }) => {
    const data = {
      input_query: searchQuery,
      input_query_type: "",
      sort_by: "default",
      status: filters.Status || [],
      exact_match: false,
      date_query: false,
      owners: filters.Owners || [],
      attorneys: filters.Attorneys || [],
      law_firms: filters.LawFirms || [],
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
        setError('No results found for your query.');
        setSearchResults([]);
        setOwners([]);
        setLawFirms([]);
        setAttorneys([]);
        return; // Exit the function early
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      const formattedMarkResults = result.body.hits.hits.map((item: ApiResponseItem) => ({
        id: Number(item._id),
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
        name: formattedMarkResults.find((item: typeof formattedMarkResults[0]) => item.current_owner_cleaned === bucket.key)?.current_owner || bucket.key,
        name_cleaned: bucket.key,
        count: bucket.doc_count,
      })) || [];

      const lawFirms = result.body.aggregations.law_firms?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: formattedMarkResults.find((item: typeof formattedMarkResults[0]) => item.law_firm_cleaned === bucket.key)?.law_firm || bucket.key,
        name_cleaned: bucket.key,
        count: bucket.doc_count,
      })) || [];

      const attorneys = result.body.aggregations.attorneys?.buckets.map((bucket: { key: string; doc_count: number }) => ({
        name: formattedMarkResults.find((item: typeof formattedMarkResults[0]) => item.attorney_name_cleaned === bucket.key)?.attorney_name || bucket.key,
        name_cleaned: bucket.key,
        count: bucket.doc_count,
      })) || [];

      handleSearchResults(formattedMarkResults, searchQuery, owners, lawFirms, attorneys);

      setError(null); // Clear the error if the search is successful

    } catch (error) {
      console.error('Error during search:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query) { // Only fetch results if the query is not empty
      await fetchResults(selectedFilters);
    } else {
      setSearchResults([]);
      setOwners([]);
      setLawFirms([]);
      setAttorneys([]);
      setError(null);
    }
  };

  const handleViewChange = useCallback((viewType: 'grid' | 'list') => {
    setViewType(viewType);
  }, []);

  return (
    <div className="w-full">
      {error && (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      )}
      <Navbar onSearch={handleSearch} />
      <TopFilter
        onFilterClick={handleToggleSideFilter}
        isSideFilterVisible={isSideFilterVisible}
        searchQuery={searchQuery}
        resultsCount={searchResults.length}
        onSortChange={handleSort}
      />
      <div className="flex flex-col-reverse md:flex-row items-start justify-between w-full px-10 pb-20">
        {viewType === 'grid' ? (
          <TableGridView searchResults={searchResults} />
        ) : (
          <TableListView searchResults={searchResults} />
        )}
        {isSideFilterVisible && (
          <SideFilter
            owners={owners}
            lawFirms={lawFirms}
            attorneys={attorneys}
            onFilterChange={handleFilterChange}
            onViewChange={handleViewChange}
          />
        )}
      </div>
    </div>
  );
}
