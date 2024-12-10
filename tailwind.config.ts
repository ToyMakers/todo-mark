import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          400: '#d7ccc8',
          500: '#bcaaa4',
          600: '#a1887f',
          700: '#8d6e63',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
