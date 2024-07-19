/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serig']
      },
      boxShadow: {
        'light': '2px 3px 6px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}