/** @type {import('tailwindcss').Config} */
import { createThemes } from "tw-colors";
import { withUt } from "uploadthing/tw";
export default withUt({
  darkMode: [],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // transparent: "transparent",
        // primary: "#1a1e22",
        // secondary: "#1d2025",
        // ternary: "#21252b",
        // white: "#ffffff",
        // error: "#f15151",
        // success: "#39b54a",
        // warning: "#ffdb3a",
        // faint: "#3f4146",
        // "w-primary": "#eeeeee",
        // "w-secondary": "#ffffff",
        // "w-ternary": "#fafafa",
        // "w-black": "#404040",
        // "w-faint": "#d6d6d6",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        airplane: {
          "0%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        explode: {
          "0%": { transform: "scale(1)" },
          "70%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(0.5)" },
        },
        fade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotateSemi: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        explode: "explode 600ms ease-in-out",
        fade: "fade 1s ease-in-out",
        fadeIn: "fadeIn 1s ease-in-out",
        rotate: "rotate 1s ease-out",
        rotateSemi: "rotateSemi 0.65s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require("tailwindcss-animate"),
    createThemes({
      dark: {
        primary: "#1a1e22",
        secondary: "#1d2025",
        ternary: "#21252b",
        white: "#ffffff",
        text: "#ffffff",
        error: "#f15151",
        success: "#39b54a",
        warning: "#ffdb3a",
        faint: "#3f4146",
      },
      light: {
        primary: "#eeeeee",
        secondary: "#ffffff",
        ternary: "#fafafa",
        white: "#ffffff",
        text: "#404040",
        black: "#404040",
        error: "#f15151",
        success: "#39b54a",
        warning: "#ffdb3a",
        faint: "#d6d6d6",
      },
      black: {
        primary: "#000",
        secondary: "#000",
        ternary: "#000",
        white: "#fff",
        text: "#fff",
        error: "#f15151",
        success: "#39b54a",
        warning: "#ffdb3a",
        faint: "#3f4146",
      },
      oak: {
        primary: "#AF8260",
        secondary: "#803D3B",
        ternary: "#E4C59E",
        white: "#FCF8F3",
        black: "#322C2B",
        text: "#000",
        error: "#f15151",
        success: "#39b54a",
        warning: "#ffdb3a",
        faint: "#3f4146",
      },
    }),
  ],
});
