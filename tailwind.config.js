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
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 #00000000' },
          '50%': { boxShadow: '0 0 10px 3px currentColor' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px) scale(0.95)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
