import { useState } from "react";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import TopFilter from "@/components/TopFilter";
import SideFilter from "@/components/SideFilter";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (data: any) => {
    setSearchResults(data);
  };

  return (
    <div className="w-full">
      <Navbar onSearch={handleSearchResults} />
      <TopFilter />
      <div className="flex items-start justify-between w-full px-10">
        <Table searchResults={searchResults} />
        <SideFilter />
      </div>
    </div>
  );
}
