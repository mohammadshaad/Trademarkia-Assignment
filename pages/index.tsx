import Image from "next/image";
import localFont from "next/font/local";
import Logo from "@/components/Logo";

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
    <div className="">
      <Logo />
      <div className={gilroyBold.className}>
        Hello World!
      </div>
    </div>
  );
}
