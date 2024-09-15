import { useState } from "react";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import TopFilter from "@/components/TopFilter";
import SideFilter from "@/components/SideFilter";
import { SearchResult } from '@/types/SearchResult';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSideFilterVisible, setSideFilterVisible] = useState(true);
  const [owners, setOwners] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [lawFirms, setLawFirms] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [attorneys, setAttorneys] = useState<{ name: string; name_cleaned: string; count: number }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  const handleToggleSideFilter = () => {
    setSideFilterVisible(prev => !prev);
  };

  const handleFilterChange = (filters: { [key: string]: string[] }) => {
    setSelectedFilters(filters);
    filterResults(filters);
  };

  const handleSearchResults = (
    data: SearchResult[],
    query: string,
    ownersList?: { name: string; name_cleaned: string; count: number }[],
    lawFirmsList?: { name: string; name_cleaned: string; count: number }[],
    attorneysList?: { name: string; name_cleaned: string; count: number }[]
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

    setSearchResults(filteredResults);
    console.log(searchResults);
  };

  return (
    <div className="w-full">
      <Navbar onSearch={handleSearchResults} />
      <TopFilter
        onFilterClick={handleToggleSideFilter}
        isSideFilterVisible={isSideFilterVisible}
        searchQuery={searchQuery}
        resultsCount={searchResults.length}
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
