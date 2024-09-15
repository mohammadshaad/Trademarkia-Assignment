import { useState, useCallback } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSideFilterVisible, setSideFilterVisible] = useState(true);
  const [owners, setOwners] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [lawFirms, setLawFirms] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [attorneys, setAttorneys] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  const handleToggleSideFilter = () => {
    setSideFilterVisible(prev => !prev);
  };

  const handleFilterChange = useCallback(async (filters: { [key: string]: string[] }) => {
    setSelectedFilters(filters);
    setPage(1); // Reset to first page when filters change
    await fetchResults(filters, 1);
  }, [searchQuery]);

  const fetchResults = async (filters: { [key: string]: string[] }, currentPage: number = page) => {
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
      page: currentPage,
      rows: rows,
      sort_order: sortOrder,
      states: [],
      counties: []
    };

    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        if (searchQuery) {
          setError('No results found for your query.');
        }
        setSearchResults([]);
        setOwners([]);
        setLawFirms([]);
        setAttorneys([]);
        setTotalResults(0);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      setTotalResults(result.body.hits.total.value);

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

      setSearchResults(formattedMarkResults);
      setOwners(owners);
      setLawFirms(lawFirms);
      setAttorneys(attorneys);
      setError(null);

    } catch (error) {
      console.error('Error during search:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
    fetchResults(selectedFilters);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on new search
    if (query) {
      await fetchResults(selectedFilters, 1);
    } else {
      setSearchResults([]);
      setOwners([]);
      setLawFirms([]);
      setAttorneys([]);
      setError(null);
      setTotalResults(0);
    }
  };

  const handleViewChange = useCallback((viewType: 'grid' | 'list') => {
    setViewType(viewType);
  }, []);

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await fetchResults(selectedFilters, newPage);
  };

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
        resultsCount={totalResults}
        onSortChange={handleSort}
      />
      <div className="flex flex-col-reverse md:flex-row items-start justify-between w-full px-10 pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <p>Loading...</p> {/* You can replace this with a spinner component */}
          </div>
        ) : searchResults.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-center">
              No results found. Please enter a search query or apply filters to find trademarks.
            </p>
          </div>
        ) : viewType === 'grid' ? (
          <TableGridView 
            searchResults={searchResults} 
            page={page}
            rows={rows}
            totalResults={totalResults}
            onPageChange={handlePageChange}
          />
        ) : (
          <TableListView 
            searchResults={searchResults} 
            page={page}
            rows={rows}
            totalResults={totalResults}
            onPageChange={handlePageChange}
          />
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
