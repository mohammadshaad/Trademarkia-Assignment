import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import TopFilter from "@/components/TopFilter";
import SideFilter from "@/components/SideFilter";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <TopFilter />
      <div className="flex items-center justify-between w-full px-10">
        <Table />
        <SideFilter />
      </div>
    </div>
  );
}
