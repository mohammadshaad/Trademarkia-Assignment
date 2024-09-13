import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroyRegular: ["GilroyRegular", "sans-serif"],
        gilroyBold: ["GilroyBold", "sans-serif"],
        gilroySemibold: ["GilroySemibold", "sans-serif"],
        gilroyMedium: ["GilroyMedium", "sans-serif"],
        gilroyLight: ["GilroyLight", "sans-serif"],
        gilroyThin: ["GilroyThin", "sans-serif"],
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        grayText: "var(--text)",
      },
    },
  },
  plugins: [],
};
export default config;
