/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Covers all JS/TS/JSX/TSX files in src/
    "./src/pages/Login.jsx", // Explicitly include Login.jsx to ensure purging
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}