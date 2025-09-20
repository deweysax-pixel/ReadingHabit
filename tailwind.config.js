/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#c7b8ff',
        turquoise: '#7bdff2',
        peach: '#fbd2c0',
        cream: '#fff9f3',
        midnight: '#1f2937',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        dreamy: '0 20px 45px rgba(125, 111, 196, 0.25)',
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(135deg, #fbd2c0 0%, #c7b8ff 50%, #7bdff2 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(123, 223, 242, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(123, 223, 242, 0)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
