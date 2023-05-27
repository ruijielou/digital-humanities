import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite';
// vite.config.js
// import { splitVendorChunkPlugin } from 'vite'
// export default defineConfig({
//   plugins: [splitVendorChunkPlugin()],
// })


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss(),
    //  splitVendorChunkPlugin()
    ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ["console.log"]
      },
      format: {
        /** 删除注释 */
        comments: false
      }
    },
    // rollup 配置
    rollupOptions: {
      // output: {
      //   manualChunks(id: any) {
      //     if (id.includes("node_modules")) {
      //       return id
      //         .toString()
      //         .split("node_modules/")[1]
      //         .split("/")[0]
      //         .toString();
      //     }
      //   }
      // }

        external: Object.keys({
          // "ant-design-vue": "^3.2.15",
          "echarts": "^5.4.2",
        }),
      
    }
  },
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