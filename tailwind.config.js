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
      fontSize: {
        tiny: '0.875rem',
        mid: '1.25rem',
        giant: '5rem',
      },
      spacing: {
        'sm-control-padding': '0.75rem',
        'sm-control-height': '2rem',
      },
      boxShadow: {
        'classic-lg': '12px 10px 4px 0 rgba(0, 0, 0, 0.20)',
        'classic-sm': '0px 0px 5px 1px rgba(0, 0, 0, 0.20)',
      },
    },
  },
  daisyui: {
    themes: ['fantasy', 'night'],
  },
  plugins: [require('daisyui')],
};
