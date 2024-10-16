// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
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
      port: 3000,
      open: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY),
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    publicDir: 'public',
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          tailwindcss()
        ]
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  };
});
