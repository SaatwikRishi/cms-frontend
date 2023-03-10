/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {

    extend: {
      colors: {
        customPurple: 'rgb(76, 6, 199)'
      },
      borderColor: {
        customPurple: 'rgb(76, 6, 199)'
      },

      backgroundColor: {
        loginDark: 'rgba(35, 35, 35, 1)',
        loginLight: 'rgba(233, 237, 254, 1)',
        customGrey: 'rgb(206,208,225)',
        customPurple: 'rgb(76, 6, 199)'
      }

    }
  },
  plugins: []
}
