/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '127': '34rem',
        '128': '36rem',
        '47-p': '47%',
        '129': '79rem',
        '130': '41rem'
      },
      height: {
        '128': '26rem',
      },
      gap: {
        '17': '4.5rem'
      }
    }
  },
  plugins: [],
}

