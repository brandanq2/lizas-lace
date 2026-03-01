/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blush:       '#D4A0A0',
        'blush-light': '#EDD5D5',
        cream:       '#FAF6F0',
        taupe:       '#8B7B6B',
        'taupe-dark': '#5C4A3A',
        'lace-white': '#FFFDF9',
      },
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
