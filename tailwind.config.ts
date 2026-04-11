import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#F5A800",
        surface: "#111111",
        border: "#222222",
      },
      fontFamily: {
        sans: ["Blinker", "sans-serif"],
        heading: ["Anton", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
