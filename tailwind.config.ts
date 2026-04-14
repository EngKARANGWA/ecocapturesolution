import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          primary: '#2e7d32',
          dark:    '#1b5e20',
          medium:  '#388e3c',
          light:   '#e8f5e9',
          lighter: '#f1f8e9',
          muted:   '#81c784',
          accent:  '#43a047',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '"Segoe UI"', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        hero: "url('/assets/hero/hero-ecocapture-new.png')",
      },
      boxShadow: {
        card:       '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.12)',
      },
      keyframes: {
        'wave-slide': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'wave-slow':   'wave-slide 9s linear infinite',
        'wave-medium': 'wave-slide 6s linear infinite reverse',
        'wave-fast':   'wave-slide 4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
