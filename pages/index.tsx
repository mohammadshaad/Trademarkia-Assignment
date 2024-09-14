import { useState } from "react";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import TopFilter from "@/components/TopFilter";
import SideFilter from "@/components/SideFilter";
import { SearchResult } from '@/types/types'; 

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Store the search query
  const [isSideFilterVisible, setSideFilterVisible] = useState(true);

  const handleToggleSideFilter = () => {
    setSideFilterVisible(prev => !prev);
  };

  const handleSearchResults = (data: SearchResult[], query: string) => {
    setSearchResults(data);
    setSearchQuery(query); // Update searchQuery when search results are updated
  };

  return (
    <div className="w-full">
      <Navbar onSearch={handleSearchResults} />
      <TopFilter 
        onFilterClick={handleToggleSideFilter} 
        isSideFilterVisible={isSideFilterVisible} 
        searchQuery={searchQuery} // Pass the search query to TopFilter
        resultsCount={searchResults.length} // Pass the number of results
      />
      <div className="flex items-start justify-between w-full px-10 pb-20">
        <Table searchResults={searchResults} />
        {isSideFilterVisible && <SideFilter />}
      </div>
    </div>
  );
}
