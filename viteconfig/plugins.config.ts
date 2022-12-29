import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const pluginsConfig =  [
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
  viteCompression({
    verbose: true, // 是否在控制台输出压缩结果
    disable: false, //开启压缩(不禁用)，默认即可
    deleteOriginFile: false, //删除源文件
    threshold: 10240, //压缩前最小文件大小
    algorithm: 'gzip', //压缩算法
    ext: '.gz', //文件类型
  })
]

export default pluginsConfig
