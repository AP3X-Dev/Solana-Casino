import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('lucide-react')) return 'icons';

          if (
            id.includes('@solana/') ||
            id.includes('@coral-xyz/') ||
            id.includes('@walletconnect/') ||
            id.includes('@toruslabs/') ||
            id.includes('bs58') ||
            id.includes('tweetnacl')
          ) {
            return 'solana';
          }

          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('chart.js') || id.includes('react-chartjs-2')) return 'charts';

          return 'vendor';
        },
      },
    },
  },
});
