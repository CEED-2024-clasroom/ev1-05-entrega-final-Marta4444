import { defineConfig } from 'vite'
//import eslint from '@rollup/plugin-eslint';

export default defineConfig({
    root: "./src",
    publicDir: "./public",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: "./index.html",
      },
    },
});