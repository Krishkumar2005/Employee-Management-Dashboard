/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        slate: {
          850: "#172033",
          950: "#0a0f1a",
        },
      },
      animation: {
        "count-up": "countUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        countUp: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
