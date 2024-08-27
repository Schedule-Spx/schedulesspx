/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'stpius-white': '#ffffff',
        'stpius-gold': '#b98827',
        'stpius-blue': '#012143',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
