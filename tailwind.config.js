/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}",
    "./screens/*.{js,jsx}",
    "./components/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      'default': ['Montserrat', 'ui-sans-serif']
    },
  },
  plugins: [],
}
