module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        xs: "0 0 1rem rgba(0, 0, 0, 0.05)",
        sm: "0 0 2rem rgba(0, 0, 0, 0.1)",
        md: "0 0 4rem rgba(0, 0, 0, 0.15)",
        lg: "0 0 6rem rgba(0, 0, 0, 0.2))",
        xl: "0 0 8rem rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
