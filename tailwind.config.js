/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#AEC6CF",
        secondary: "#FFF5BA",
        coolBlue: "#3495DB",
        warmYellow: "#FFC300",
        lightGray: "#ECF0F1",
        darkGray: "#2C3E50",
        Gray: "#95A5A6",
        black: "#222222",
      },
    },
  },
  plugins: [],
};
