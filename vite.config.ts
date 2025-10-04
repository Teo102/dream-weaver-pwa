// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // options utiles pour compatibilité Vercel (facultatif)
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
