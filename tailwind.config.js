/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-jost)'],
      },
      colors: {
        black: '#000000',
        'rose-red': '#BA274A',
        'bright-pink': '#F56476',
        'dogwood-rose': '#D90368',
        'minimal-grey': '#a6adbb',
        'princeton-orange': '#FF9505',
        icterine: '#F6F740',
        pear: '#C1DF1F',
      },
    },
  },
  daisyui: {
    themes: ['fantasy', 'night'],
  },
  plugins: [require('daisyui')],
};
