const colors = require("tailwindcss/colors");

module.exports = {
  dakMode: "class",
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#0FF46E",
          200: "#0DDB63",
          300: "#0CC358",
          400: "#0AAA4D",
          500: "#099242",
          600: "#077A37",
          700: "#06612C",
          800: "#044921",
          900: "#033016",
        },
        gray: colors.neutral,
        gray: {
          100: "#f2f3f5",
          200: "#ebedef",
          300: "#e3e5e8",
          400: "#d4d7dc",
          500: "#4f546e",
          600: "#4f545c",
          700: "#36393f",
          800: "#2f3136",
          900: "#191C1A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
