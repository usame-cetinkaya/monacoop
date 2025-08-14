import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Extract script files into separate chunks with stable names
          if (id.includes('/src/scripts/') && id.endsWith('.js')) {
            const scriptName = path.basename(id, '.js');
            return `scripts/${scriptName}`;
          }
          
          // Vendor chunks for node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Use consistent naming for chunks to enable long-term caching
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name]-[hash].js',
      },
    },
  },
});
