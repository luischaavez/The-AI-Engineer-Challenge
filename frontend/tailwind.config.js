/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coolors palette: https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff
        navy: {
          50: "#e8eaed",
          100: "#c4cad3",
          200: "#9ca7b6",
          300: "#748498",
          400: "#576982",
          500: "#14213d", // Main Oxford Blue
          600: "#121e37",
          700: "#0e182e",
          800: "#0b1326",
          900: "#060b18",
        },
        orange: {
          50: "#fff8e6",
          100: "#ffedc0",
          200: "#ffe196",
          300: "#ffd56b",
          400: "#ffcc4b",
          500: "#fca311", // Main Orange Yellow
          600: "#f59b0f",
          700: "#ed910c",
          800: "#e5880a",
          900: "#d97605",
        },
        platinum: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5", // Main Platinum
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
    },
  },
  plugins: [],
};
