import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import TopFilter from "@/components/TopFilter";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <TopFilter />
      <Table />
    </div>
  );
}
