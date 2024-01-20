/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        borDER: "rgb(39,39,42)",
        Written: "rgb(242,242,242)",
        subWritten: "rgb(161,161,169)",
        write: "rgb(28 25 23)",
        write2: "rgb(68 64 60)",
        Dred: "rgb(207,54,76)",
      },
      backgroundColor: {
        mainBody: "rgb(12,10,9)",
        mainBoxes: "rgb(27,23,25)",
        btnC: "rgb(207,54,76)",
        rosered: "rgb(239 239 239)",
        write2: "rgb(68 64 60)",
        lightblue: "rgb(222 231 235)",
      },
    },
  },
  plugins: [],
};
