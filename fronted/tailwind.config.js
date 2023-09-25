/** @type {import('tailwindcss').Config} */

import themes from "./src/constants/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: themes.primary.main,
      },
    },
  },
  plugins: [],
};
