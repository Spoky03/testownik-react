/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'primary': '#1a1e22',
        'secondary': '#1d2025',
        'ternary': '#21252b',
        'white': '#ffffff',
        'error': '#e3342f',
        
      },
    },
  },
  plugins: [],
}