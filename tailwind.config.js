/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      fontSize: {
        80: "80px",
      },
      width: { 25: "100px" },
      height: {
        25: "100px",
        82: "390px",
      },
      colors: {
        fade: "#E2E2E2",
        faded: "#BEBEBE",
        main: "#A3A3A3",
      },
      screens: {
        destop: "1137px",
      },
    },
  },
  plugins: [],
};
