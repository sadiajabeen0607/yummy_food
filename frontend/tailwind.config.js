/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'lg': {'max': '1050px'},
      'md': {'max': '900px'},
      'sm': {'max': '750px'},
    },
    extend: {
      boxShadow: {
        'custom': '0px 0px 10px rgba(0, 0, 0, 0.09)', // #00000015 in rgba
      },
      gridTemplateColumns: {
        'auto-fill-minmax': 'repeat(auto-fill, minmax(240px, 1fr))',
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        spinSlow: 'rotate 1s infinite',  // Add your custom spinning animation here
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        rotate: {
          '100%': { transform: 'rotate(360deg)' },  // Custom keyframes for rotating
        },
      },
    },
  },
  plugins: [],
}
