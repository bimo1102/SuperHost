const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addUtilities }) => {
    const newUtilities = {
        '.position-sticky': {
            position: 'sticky !important',
        },
        '.z-index-3': {
            'z-index': '3 !important',
        },
    };
    addUtilities(newUtilities);
});
