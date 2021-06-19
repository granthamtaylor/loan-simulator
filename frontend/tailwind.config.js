module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),

      'blvd-green-primary': '#00CC74',
      'blvd-green-light': '#00A69C',
      'blvd-green-dark': '#006838',

      'blvd-blue-primary': '#1D6087',
      'blvd-blue-light': '#FFFA9A',
      'blvd-blue-dark': '#262261',

      'blvd-army-primary': '#336633',
      'blvd-army-light': '#8BC53F',
      'blvd-army-dark': '#0D2807',

      'blvd-navy-primary': '#1B75BB',
      'blvd-navy-dark': '#11286A',
      'blvd-navy-light': '#94B2F0',

      'blvd-red-primary': '#BE1E2D',
      'blvd-red-dark': '#70110A',
      'blvd-red-light': '#FFCA55',

    })
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ]
}
