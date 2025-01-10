/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./style/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}