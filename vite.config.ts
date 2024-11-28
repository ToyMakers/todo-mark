import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        main: 'src/main.tsx',
        db: 'src/db/dbManager.ts',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].css',
      },
    },
    outDir: 'dist',
  },
});
