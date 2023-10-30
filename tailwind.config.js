/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6c63ff',
        secandary: '#3d33ff',
        success: '#00b300',
        error: '#cc2900',
      },
    },
  },
  plugins: [],
}
