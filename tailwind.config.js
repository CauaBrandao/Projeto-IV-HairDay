/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hair: {
          bg: '#141416',
          card: '#1F1E22',
          subcard: '#27262B',
          input: '#2A292E',
          border: '#38363E',
          borderMuted: '#2C2B32',
          textMuted: '#98959D',
          textSubtle: '#65636D',
          gold: '#B88E2F',
          goldHover: '#C99D37',
          goldLight: '#E5B744',
          goldDark: '#4A3B18',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

