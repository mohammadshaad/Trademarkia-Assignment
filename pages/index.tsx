import Image from "next/image";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";

const gilroyRegular = localFont({
  src: "./fonts/Gilroy/Gilroy-Regular.ttf",
  display: "swap"
});
const gilroyBold = localFont({
  src: "./fonts/Gilroy/Gilroy-Bold.ttf",
  display: "swap"
});


export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <div className={gilroyBold.className}>
        Hello World!
      </div>
    </div>
  );
}
