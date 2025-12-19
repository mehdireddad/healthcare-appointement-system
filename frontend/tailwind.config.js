/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#00A7B5', // Votre cyan/turquoise
        'neutral-gray': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Police moderne et lisible
      }
    },
  },
  plugins: [],
}
