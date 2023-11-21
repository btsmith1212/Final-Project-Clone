/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "dark": "#252422",
      "gray": "#fbf8f3",
      "white": "#ffffff",
      "olive": "#6b9080",
      "green-gray": "#d8ddd7",
      "light-gray": "#f8f9fa"
    },
    extend: {},
  },
  plugins: [],
}