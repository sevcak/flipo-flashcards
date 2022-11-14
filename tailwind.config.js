/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}",
    "./screens/*.{js,jsx}",
    "./components/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      'default': ['Montserrat', 'ui-sans-serif'],
      'bold': ['Montserrat-Bold', 'ui-sans-serif'],
      'extra-bold': ['Montserrat-ExtraBold', 'ui-sans-serif'],
      'light': ['Montserrat-Light', 'ui-sans-serif'],
    },
    extend: {
      colors: {
        'primary': {
          'light': '#ffffff',
          DEFAULT: '#ffffff',
          'dark': '#161616',
        },
        'secondary': {
          'light': '#161616',
          DEFAULT: '#161616',
          'dark': '#ffffff',
        },
        'ui': {
          'light': '#b4b4b4',
          DEFAULT: '#b4b4b4',
          'dark': '#656565',
        },
        'strong': {
          'light': '#3b3b3b',
          DEFAULT: '#3b3b3b',
          'dark': '#d6d6d6',
        },
        'green': {
          'light': '#4ef4b9',
          DEFAULT: '#4ef4b9',
          'dark': '#28b8af',
        },
        'alert': {
          DEFAULT: '#d60000',
        }
      }
    }
  },
  safelist: [
    'bg-primary-light',
    'bg-primary-dark',
    'bg-green-light',
    'bg-green-dark',
    'bg-ui-light',
    'bg-ui-dark',
    'bg-card-light',
    'bg-card-dark',
    'text-primary-light',
    'text-primary-dark',
    'text-green-light',
    'text-green-dark',
    'text-ui-light',
    'text-ui-dark',
    'text-card-light',
    'text-card-dark',
  ],
  plugins: [],
}
