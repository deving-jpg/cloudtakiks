import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CloudTaktiks brand palette (fixed in both themes)
        brand: {
          blue: "#4F7CFE",
          deep: "#172D9D",
          cyan: "#4ADEDE",
          sky: "#7DD6F6",
          gray: "#D7D7D7",
        },
        // fixed deep-navy constants for accent panels
        navy: {
          DEFAULT: "#0A1352",
          deep: "#06092E",
          900: "#080E40",
          800: "#0E1A5E",
          700: "#16267A",
        },
        // semantic, theme-aware tokens (flip via .dark class)
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        surface2: "rgb(var(--c-surface-2) / <alpha-value>)",
        content: "rgb(var(--c-text) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "var(--font-arabic)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.02em",
        wide2: "0.18em",
        wide3: "0.32em",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(79,124,254,0.55)",
        card: "0 24px 70px -34px rgba(10,16,60,0.45)",
      },
      backgroundImage: {
        "brand-grad": "linear-gradient(155deg, #4F7CFE 0%, #172D9D 100%)",
        electric: "linear-gradient(120deg, #4F7CFE 0%, #4ADEDE 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("rtl", '[dir="rtl"] &');
      addVariant("ltr", '[dir="ltr"] &');
    }),
  ],
};

export default config;
