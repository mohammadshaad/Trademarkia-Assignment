import Image from "next/image";
import localFont from "next/font/local";

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
      <div className="logo">
        <Image src="/logos/logo.svg" alt="Logo" width={100} height={100} />
      </div>
      <div className={gilroyBold.className}>
        Hello World!
      </div>
    </div>
  );
}
