// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode with a class
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
