/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'first':{
          50: '#ffffe0',
          100: '#ffffe0',
          200: '#fffdd0',
          300: '#fcffa4',
          400: '#ffff66',
          500: '#fff44f',
          600: '#fefe33',
          700: '#ffef00',
          800: '#fff000',
          900: '#ffdf00',
          950: '#ffd800'
        },
        'second':{
          50: '#030712',
          100: '#030712',
          200: '#030712',
          300: '#030712',
          400: '#030712',
          500: '#030712',
          600: '#030712',
          700: '#030712',
          800: '#030712',
          900: '#030712',
          950: '#030712'
        }
      }
    },
  },
  plugins: [],
}

