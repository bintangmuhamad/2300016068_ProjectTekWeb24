// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenGoPalm: '#6DBF57',   // Hijau khas GoPalm
        orangeGoPalm: '#FFA500',  // Orange khas GoPalm
      },
    },
  },
  plugins: [],
}
