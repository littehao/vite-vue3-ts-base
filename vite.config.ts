import { defineConfig,ConfigEnv,UserConfig } from 'vite'
import { resolve } from 'path'
import sharedConfig from './viteconfig/shared.config'
import pluginsConfig from './viteconfig/plugins.config'
const pathSrc = resolve(__dirname, 'src')

const baseConfig = {
  base: './',
  plugins: pluginsConfig,
  resolve: {
    alias: {
      '@': pathSrc
    }
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
}
export default defineConfig(({ command, mode }:ConfigEnv):UserConfig => {
  return {
    ...baseConfig,
    ...sharedConfig({ command, mode })
  }
})
