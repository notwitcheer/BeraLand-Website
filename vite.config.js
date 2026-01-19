import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Content Security Policy configuration
const createCSP = (isProduction) => {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // unsafe-inline needed for React
    "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for CSS-in-JS
    "img-src 'self' data: https:", // Allow external images from HTTPS and data URIs
    "font-src 'self' data:",
    "connect-src 'self' https:", // Allow external API calls over HTTPS
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join('; ')

  return csp
}

// Simple CSP plugin for development
const cspPlugin = (isProduction) => ({
  name: 'csp-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      res.setHeader('Content-Security-Policy', createCSP(isProduction))
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
      next()
    })
  },
  generateBundle() {
    if (isProduction) {
      console.log('\n📋 Production CSP Header:')
      console.log('Content-Security-Policy:', createCSP(true))
      console.log('\n⚠️  Remember to configure these headers in your web server (Netlify, Vercel, etc.)')
    }
  }
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react(), cspPlugin(isProduction)],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'build',
      // Disable sourcemaps in production for security
      sourcemap: !isProduction,
      // Add some additional optimizations
      minify: 'terser',
      rollupOptions: {
        output: {
          // Separate chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            wagmi: ['wagmi', 'viem', '@wagmi/core'],
            ui: ['@tanstack/react-query']
          }
        }
      }
    }
  }
})
