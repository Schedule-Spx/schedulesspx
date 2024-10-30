// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      // React plugin with SWC for faster builds
      react(),
      
      // PWA configuration
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Schedule-SPX',
          short_name: 'Schedule-SPX',
          description: 'Your school schedule management app',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      })
    ],
    server: {
      port: 3000, // Dev server port
      open: true, // Opens the browser automatically
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'], // Default extensions
      alias: {
        '@': path.resolve(__dirname, './src'), // Alias for src directory
      },
    },
    define: {
      // Define environment variables for use in the app
      'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY),
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
    },
    build: {
      outDir: 'dist', // Output directory for build
      target: 'esnext', // JavaScript target
      minify: mode === 'production' ? 'terser' : false, // Minification settings
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console logs in production
          drop_debugger: mode === 'production' // Remove debugger statements in production
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'], // Separate vendor chunk
          },
        },
      },
    },
    publicDir: 'public', // Directory for static assets
    css: {
      postcss: {
        plugins: [
          autoprefixer(), // Adds vendor prefixes
          tailwindcss()   // Tailwind CSS integration
        ]
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' } // Suppress specific warnings
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'], // Pre-bundle dependencies
    },
  };
});
