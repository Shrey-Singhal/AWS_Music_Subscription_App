/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': 'rgb(38, 35, 34)',
        'custom-color2': 'rgb(242, 229, 215)',
      },
      textColor: {
        'custom-color3':'rgb(139, 128, 249)',
      }
    },
  },
  plugins: [],
}

