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
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      }
    },
  },
  plugins: [],
}

