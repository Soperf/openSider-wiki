/**
 * @author xiaopeng.fxp
 * @date 2026-07-19
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  server: { port: 5181, strictPort: false },
  build: { rollupOptions: { input: { index: resolve(__dirname, 'index.html'), privacy: resolve(__dirname, 'privacy/index.html') } } },
});
