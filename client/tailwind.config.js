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
        },
        explode: {
          "0%": { transform: "scale(1)" },
          "70%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(0.5)" }
        },
        fade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.5" }
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        rotateSemi: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        explode: "explode 600ms ease-in-out",
        fade: "fade 1s ease-in-out",
        rotate: "rotate 1s ease-out",
        rotateSemi: "rotateSemi 0.65s ease-out"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}