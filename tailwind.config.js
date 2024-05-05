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
    },
  },
  plugins: [],
};
