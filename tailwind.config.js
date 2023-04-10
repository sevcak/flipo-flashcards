/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
        'card': {
          'light': '#ebebeb',
          DEFAULT: '#ebebeb',
          'dark': '#2f2f2f',
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
          DEFAULT: '#ef0000',
        },
        'rate': {
          '1': '#ff4e4d',
          '2': '#ff714b',
          '3': '#ffba50',
          '4': '#f3de6f',
          '5': '#acdc7c',
        }
      }
    }
  },
  plugins: [],
}

