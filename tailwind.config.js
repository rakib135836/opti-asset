/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: '"Poppins", sans-serif'
      },
      backgroundImage: {
        'custom-image': "url(https://i.ibb.co/jJT5XZZ/Cute-Colorful-Abstract-Blank-Background-Instagram-Story.png)",
      },
    },
  },
  plugins: [require('daisyui'),],
}

