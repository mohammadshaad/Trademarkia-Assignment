import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

// Import fonts
const gilroyRegular = localFont({
  src: "./fonts/Gilroy/Gilroy-Regular.ttf",
  display: "swap",
  variable: "--gilroy-regular"
});

const gilroyBold = localFont({
  src: "./fonts/Gilroy/Gilroy-Bold.ttf",
  display: "swap",
  variable: "--gilroy-bold"
});

const gilroySemibold = localFont({
  src: "./fonts/Gilroy/Gilroy-Semibold.ttf",
  display: "swap",
  variable: "--gilroy-semibold"
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
