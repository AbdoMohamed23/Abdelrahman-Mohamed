/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        'primary': '#B91C1C', // Red-700 ,d13e38 the old
        'sec_primary': '#161616',
        'contact': '#090C14', // Gray-900/50 with opacity ,1D1D1D the old
      },
    },
  },
  plugins: [],
}

