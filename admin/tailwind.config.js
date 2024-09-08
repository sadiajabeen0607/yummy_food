/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'lg': {'max': '1000px'},
      // => @media (max-width: 1050px) { ... }

      'md': {'max': '900px'},
      // => @media (max-width: 900px) { ... }

      'sm': {'max': '600px'},
      // => @media (max-width: 750px) { ... }
    },
    extend: {},
  },
  plugins: [],
}