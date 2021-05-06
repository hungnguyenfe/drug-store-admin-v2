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
          info: '#42baf9',
          success: '#41b883',
        }
      },
    },
    variants: {
      extend: {
      },
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')],
};
