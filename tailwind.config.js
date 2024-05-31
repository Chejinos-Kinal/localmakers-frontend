/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          teal: '#67b6b7',       // Color personalizado teal
          mint: '#c3ebde',       // Color personalizado mint
          blue: '#376bc1',       // Color personalizado blue
          darkblue: '#132e5c',   // Color personalizado dark blue
          green: '#3c8464',      // Color personalizado green
        },
      },
    },
  },
  plugins: [],
}

