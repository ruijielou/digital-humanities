import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite';
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

// vite.config.js
// import { splitVendorChunkPlugin } from 'vite'
// export default defineConfig({
//   plugins: [splitVendorChunkPlugin()],
// })


// https://vitejs.dev/config/
export default defineConfig({
  // base: "./",
  plugins: [vue(), Unocss(),
  //  splitVendorChunkPlugin()

  importToCDN({

    modules: [
      // autoComplete('vue'), // vue2 use autoComplete('vue2')
      // autoComplete('@vueuse/shared'),
      // autoComplete('@vueuse/core'),
      // 　　{
      //   name:'vue',
      //   var:'Vue',
      //   path:'https://cdn.jsdelivr.net/npm/vue@3.2.47'
      // },
      // {
      //   name: 'ant-design-vue',
      //   var: "antd",
      //   path: "https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.15/dist/antd.min.js",
      //   // https://cdn.jsdelivr.net/npm/ant-design-vue@2.3.0/dist/antd.min.js
      //   css: "https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.15/dist/antd.min.css"
  
      // },
      // {
      //   name: 'dayjs',
      //   var: "dayjs",
      //   path: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.7'
      // },
      // {
      //   name: 'echarts',
      //   var: "echarts",
      //   path: './echarts.js'
      // }
    ],
  }),
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
    // rollupOptions: {
    //   // output: {
    //   //   manualChunks(id: any) {
    //   //     if (id.includes("node_modules")) {
    //   //       return id
    //   //         .toString()
    //   //         .split("node_modules/")[1]
    //   //         .split("/")[0]
    //   //         .toString();
    //   //     }
    //   //   }
    //   // }

    //   external: Object.keys({
    //     // "ant-design-vue": "^3.2.15",
    //     "echarts": "^5.4.2",
    //   }),

    // },
    rollupOptions: {
      output: {
          manualChunks(id: any) {  
              if (id.includes("node_modules")) {
                  return id
                          .toString()
                          .split("node_modules/")[1]
                          .split("/")[0]
                          .toString();
          }
          }
      }
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
        target: 'http://dhc.lipengwencai.com/app',//接口代理地址
        // target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app/, ' '),
      },
      '^/temp': {
        target: 'http://dhc.lipengwencai.com/temp', //图片代理地址
        // target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/temp/, ' '),
      },
    },
  },
})