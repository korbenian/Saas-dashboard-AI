/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}' // Важно! чтобы всё из src учитывалось
  ],
  darkMode: 'class', // если хочешь управлять вручную (а не по системной теме)
  theme: {
    extend: {}
  },
  plugins: []
}
