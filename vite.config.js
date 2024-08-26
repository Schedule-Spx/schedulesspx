// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(process.env.VITE_GOOGLE_CLIENT_ID),
    'process.env.VITE_GOOGLE_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_API_KEY),
  },
  build: {
    rollupOptions: {
      external: ['axios'],
    },
  },
});
