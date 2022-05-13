import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const pathResolve = (dir: string) => resolve(__dirname, dir);

export default defineConfig({
  plugins:[
    vue(),
    // 按需引入 element plus 组件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      // 别名
      "@": pathResolve("./src"),
    }
  },
  build: {
    // 主要用于兼容低版本浏览器 可以解决chrome65版本打包发布到服务器上页面空白的问题(主要是65版本不兼容 try catch )
    target: "es2015",
    // 兼容低版本浏览器上样式问题
    cssTarget:"chrome65",
    // 打包配置路径
    assetsDir: "./assets",
    rollupOptions: {
      // 主要用于配置多页面
      input: {
        platForm: resolve(__dirname, "platform.html"),
        merchant: resolve(__dirname, "merchant.html")
      }
    }
  },
})
