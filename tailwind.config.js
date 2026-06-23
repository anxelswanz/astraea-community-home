/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        astraea: {
          ink: "#f5f1e8",
          muted: "#b8c1ca",
          green: "#77d59b",
          cyan: "#7adbe8",
          amber: "#f2c36b",
          coral: "#f08f7f",
          night: "#070a0f",
        },
      },
      boxShadow: {
        panel: "0 24px 70px rgba(0, 0, 0, 0.42)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
