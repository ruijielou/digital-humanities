import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import "nprogress/nprogress.css"
import 'uno.css';
import './assets/styles/index.less';
// import "./assets/styles/main.css";
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

import { setupRouter } from "./router/index";
import { setupStore } from "./store/index";

const app = createApp(App);
// await setupRouter(app);


// app.use(createPinia());

async function setupApp() {
    // 挂载vuex状态管理
    await setupStore(app);

    await setupRouter(app);
    
    app.component('Header', Header);
    app.component('Footer', Footer);
    app.use(Antd);

    app.mount('#app');
}

setupApp();
