import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      components: {
        '.custom-checkbox': {
          appearance: 'none',
          width: '1rem',
          height: '1rem',
          'background-color': '#f3f4f6',
          'border-color': '#d1d5db',
          'border-radius': '0.25rem',
          'focus:ring': '2',
          'focus:ring-color': '#f59e0b',
          'checked:bg': '#f59e0b',
          'checked:border-color': '#f59e0b',
          'checked:before:content': "'✔'",
          'checked:before:color': '#ffffff',
          'checked:before:flex': 'true',
          'checked:before:justify-center': 'true',
          'checked:before:items-center': 'true',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
