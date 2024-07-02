/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00cc00',
        secandary: '#009900',
        success: '#1f8f2c',
        hoverSuccess: '#125219',
        error: '#c91212',
        hoverError: '#871010',
      },
    },
  },
  plugins: [],
}
