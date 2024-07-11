import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      gridTemplateColumns: {
        "main-layout": "200px 4fr",
        "profile-layout": "repeat(2, 1fr)"
      },
      boxShadow: {
        custom: "0 0 10px 3px rgba(116, 116, 116, 0.3)"
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
export default config;
