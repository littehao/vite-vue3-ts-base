import { createApp } from 'vue'
import './styles/index.scss'

import App from './App.vue'
import router from "./router/index";
import { store, key } from './store'

//按需导入组件库
import Icons from './element-plus/icons'

const app = createApp(App);
app.use(router);
app.use(store, key);
app.use(Icons)
app.mount("#app");
