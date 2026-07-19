/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  server: { port: 5181, strictPort: false },
  build: { rollupOptions: { input: { index: 'index.html' } } },
});
