/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6c63ff',
        secandary: '#3d33ff',
        success: '#1f8f2c',
        hoverSuccess: '#125219',
        error: '#c91212',
        hoverError: '#871010',
      },
    },
  },
  plugins: [],
}
