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
        'error': '#7b1e1e',
        'success': '#39b54a',
        'faint': '#3f4146',
        'w-primary': '#eeeeee',
        'w-secondary': '#ffffff',
        'w-ternary': '#fafafa',
        'w-black': '#404040',

      },
    },
  },
  plugins: [],
}