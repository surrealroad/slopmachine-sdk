/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./demo/index.html",
    "./src/**/*.{ts,tsx}",
    "./demo/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slop-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "slop-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "slop-shimmer": "slop-shimmer 2s ease-in-out infinite",
        "slop-spin": "slop-spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
