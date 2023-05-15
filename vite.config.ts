import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "@/assets/styles/variables.less";
        `,
        modifyVars: {
          'primary-color': '#5B3DF2',
          'error-color': '#F243D9',
          'border-radius-base': '0'
        },
      },
    },
  },
  server: {
    proxy: {
      '^/app': {
        target: 'http://dhc.api.lipengwencai.com/app',//接口代理地址
        // target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app/, ' '),
      },
      '^/temp': {
        target: 'http://dhc.api.lipengwencai.com/temp', //图片代理地址
        // target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/temp/, ' '),
      },
    },
  },
})