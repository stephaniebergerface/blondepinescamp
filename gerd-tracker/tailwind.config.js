/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7f5',
          100: '#e6ede8',
          200: '#c9dacf',
          300: '#a1bfab',
          400: '#749d81',
          500: '#537f62',
          600: '#40654d',
          700: '#35513f',
          800: '#2c4235',
          900: '#25372c',
        },
        flare: {
          400: '#e8a25a',
          500: '#dc8536',
          600: '#c06d27',
        },
      },
    },
  },
  plugins: [],
}
