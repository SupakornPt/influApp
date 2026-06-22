import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      colors: {
        primary: "#4F46E5",
        secondary: "#7C3AED",
        accent: "#F43F5E",
        role: {
          navy: {
            50: "#E8EDF5",
            DEFAULT: "#1B2A4A"
          },
          coral: {
            50: "#FFF0EB",
            DEFAULT: "#FF6F61"
          }
        },
        nav: {
          bronze: {
            100: "#F5E8D4",
            200: "#E5CFA0",
            800: "#735510",
            900: "#8B6914"
          },
          teal: {
            100: "#D4ECEC",
            200: "#A8D4D4",
            800: "#0B4343",
            900: "#0D4F4F"
          },
          brown: {
            100: "#EDE4DC",
            200: "#D4C0B0",
            800: "#4A3429",
            900: "#5C4033"
          },
          ocean: {
            100: "#D6EBF5",
            200: "#A8D4EB",
            800: "#005A80",
            900: "#006994"
          },
          burnt: {
            100: "#F5DFCC",
            200: "#E8C4A0",
            800: "#B84A00",
            900: "#CC5500"
          },
          forest: {
            100: "#D9E8DC",
            200: "#A8D4B8",
            800: "#1E7A1E",
            900: "#228B22"
          }
        }
      }
    }
  },
  plugins: []
};

export default config;
