import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import fs from 'fs'
const pathSrc = resolve(__dirname, 'src')
const optimizeDepsElementPlusIncludes = ["element-plus/es"];
fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
    fs.access(
        `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
        (err) => {
            if (!err) {
                optimizeDepsElementPlusIncludes.push(
                    `element-plus/es/components/${dirname}/style/css`
                );
            }
        }
    );
});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      useSource: true
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ]
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ]
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 注入样式变量（根据自己需求注入其他）
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  optimizeDeps: {
      include: optimizeDepsElementPlusIncludes,
  },
  server: {
    //服务器主机名
    host: "localhost",
    //端口号
    port: 3000,// 不知为何更改会有问题
    //设为 true 时若端口已被占用则会直接退出，
    //而不是尝试下一个可用端口
    strictPort: true,
    cors: true, // 默认启用并允许任何源
    open: false, // 在服务器启动时自动在浏览器中打开应用程序
    //https.createServer()配置项
    https: false,
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '^/api': {
        target: 'https://ht.api.shop.shengshihongda.com/api',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
