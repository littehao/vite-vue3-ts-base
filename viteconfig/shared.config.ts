import fs from 'fs'
import { ConfigEnv,UserConfig } from 'vite'
//排除重载的依赖项
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
export default function sharedConfig ({ command, mode }:ConfigEnv) :UserConfig {
  return {
    css: {
      preprocessorOptions: {
        scss: {
          // 注入样式变量（根据自己需求注入其他）
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    },
    build: {
      minify: 'esbuild', // 默认
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [],
        // 指定文件输出的配置
        output: {
          chunkFileNames: `assets/js/[name]-[hash].js`,
          entryFileNames: `assets/js/[name]-[hash].js`,
          assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
          manualChunks(id: any) {
            if (id.includes('node_modules')) {
              return 'vendor' //代码分割为第三方包
            }
          },
        },
      },
    },
    esbuild: {
      //构建移除 console
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
        include: optimizeDepsElementPlusIncludes,
    },
  }
}
