module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      'darkgrey': '#000a12',
      'grey': '#263238',
      'lightgrey': '#4f5b62',
      'orange': '#f6b93b',
      'white': '#ffffff'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
