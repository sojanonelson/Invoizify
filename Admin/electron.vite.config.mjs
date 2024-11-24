import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      
      minify: 'terser', // Use terser minification
      terserOptions: {
        compress: {
          drop_console: true, // Remove console logs in production
        },
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
     
      chunkSizeWarningLimit: 1000,
      minify: 'terser', // Use terser minification
      terserOptions: {
        compress: {
          drop_console: true, // Remove console logs in production
        },
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
    build: {
      minify: 'terser', // Use terser minification
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true, // Remove console logs in production
        },
      },
    },
  },
});
