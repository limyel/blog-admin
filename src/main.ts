import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router/index"
import store from "@/store/index"
import zhCn from "element-plus/es/locale/lang/zh-cn";
import ElementPlus from "element-plus"

const app = createApp(App)

app.use(ElementPlus,{locale:zhCn})

app
    // 挂载路由
    .use(router)
    // 挂载 vuex
    .use(store)
    .mount("#app")
