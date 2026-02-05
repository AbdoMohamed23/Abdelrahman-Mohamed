/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        'primary': '#017FD3',
        'light_': '#f8f9fa',
        'off-white': '#f5f6f7',
        'dark_': '#0f120f',
        'sec_primary': '#f9fafb',
        'contact': '#090C14',
      },
    },
  },
  plugins: [],
}


