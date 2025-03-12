/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3352CC',
            light: '#4F6AE5',
            dark: '#29419F',
          },
          secondary: {
            DEFAULT: '#1F2A3F',
            light: '#2D384D',
            dark: '#151D2D',
          },
          accent: '#4A4FE4',
          black: '#000000',
          white: '#ffffff',
        },
      },
    },
    plugins: [],
  }