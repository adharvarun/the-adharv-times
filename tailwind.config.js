/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;