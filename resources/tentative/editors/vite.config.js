
import { resolve } from 'path'
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        monaco: resolve(__dirname, 'monaco.html'),
        tiptap: resolve(__dirname, 'tiptap.html'),
      },
    },
  },
});
