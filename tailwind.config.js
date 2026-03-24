/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        obsidian: '#0a0a0a',
        'warm-white': '#f5f0eb',
        gold: '#c9a96e',
        'gold-light': '#e8c98a',
      },
    },
  },
  plugins: [],
}
