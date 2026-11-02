/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF9F2',
        cream: '#F7EBDD',
        blush: '#F4B7C8',
        rose: '#D9829B',
        lavender: '#D8C5F2',
        plum: '#76536F',
        cocoa: '#59413C',
        charcoal: '#29252A',
        gold: '#D8B574',
        moon: '#FFF0C9',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
