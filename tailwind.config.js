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
      height: {
        82: "390px",
      },
      colors: {
        fade: "#E2E2E2",
        faded: "#BEBEBE",
      },
      screens: {
        destop: "1137px",
      },
    },
  },
  plugins: [],
};
