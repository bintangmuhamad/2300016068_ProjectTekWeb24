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
        orangeGoPalm: '#FFA500',  // Oranye khas GoPalm
      },
      backgroundImage: {
        'gradient-orange-green': 'linear-gradient(to right, #FFA500, #6DBF57)', // Gradasi oranye ke hijau
        'gradient-green-orange': 'linear-gradient(to right, #6DBF57, #FFA500)', // Gradasi hijau ke oranye
      },
      screens: {
        sm: '640px', // Ukuran kecil
        md: '768px', // Ukuran sedang
        lg: '1024px', // Ukuran besar
        xl: '1280px', // Ukuran ekstra besar
        '2xl': '1536px', // Ukuran ekstra besar 2
      },
    },
  },
  plugins: [],
};

