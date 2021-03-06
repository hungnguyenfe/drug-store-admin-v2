const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    important: true,
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          primary: '#003c6e',
          'darken-primary': '#003563',
          'lighten-primary': '#005196',
          info: '#42baf9',
          success: '#41b883',
        }
      },
    },
    variants: {
      extend: {
        backgroundColor: ['active', 'focus'],
      }
    },
};
