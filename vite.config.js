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
  
  // Separate PWA configs for dev and prod
  const pwaOptions = {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'Schedule-SPX',
      short_name: 'Schedule-SPX',
      description: 'St. Pius X School Schedule Web App',
      theme_color: '#001F3F',
      background_color: '#ffffff',
      display: 'standalone',
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
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    // Common workbox options
    workbox: {
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/schedule-api\.devs4u\.workers\.dev\/api\/.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'schedule-api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60, // 1 hour
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/www\.googleapis\.com\/calendar\/v3\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'google-calendar-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 5, // 5 minutes
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
      ],
    },
    // Development-specific options
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallback: 'index.html',
      resolveTempFolder: () => path.resolve(__dirname, 'public')
    }
  };
  
  // Add production-specific options
  if (mode === 'production') {
    pwaOptions.workbox.globPatterns = ['**/*.{js,css,html,ico,png,svg}'];
  } else {
    // Development mode configuration
    // Use public directory instead of default "dev-dist"
    pwaOptions.devOptions.resolveTempFolder = () => path.resolve(__dirname, 'public');
    // Remove any explicit setting of globDirectory, let resolveTempFolder take effect
    pwaOptions.workbox.globPatterns = ['**/*.{ico,png,svg,html}'];
  }

  return {
    plugins: [
      // React plugin with SWC for faster builds
      react(),
      
      // PWA plugin with fixed configuration
      VitePWA(pwaOptions)
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
