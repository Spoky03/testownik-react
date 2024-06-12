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
        'error': '#f15151',
        'success': '#39b54a',
        'warning': '#ffdb3a',
        'faint': '#3f4146',
        'w-primary': '#eeeeee',
        'w-secondary': '#ffffff',
        'w-ternary': '#fafafa',
        'w-black': '#404040',
        'w-faint': '#d6d6d6',
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}