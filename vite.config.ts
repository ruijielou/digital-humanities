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
          // @import "ant-design-vue/lib/style/themes/default.less";
          @import "@/assets/styles/variables.less";
        `,
        modifyVars: {
          'primary-color': '#5B3DF2'
        },
      },
    },
  },
})