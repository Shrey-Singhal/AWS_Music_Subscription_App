/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': 'rgb(38, 35, 34)',
        'custom-color2': 'rgb(242, 229, 215)',
        'custom-green-color':'rgb(4, 117, 77)',
      },
    },
  },
  plugins: [],
}

