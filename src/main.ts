import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import 'uno.css';
import './assets/styles/index.less';
// import "./assets/styles/main.css";
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

import router from "./router";


const app = createApp(App);

app.component('Header', Header);
app.component('Footer', Footer);
app.use(Antd);
app.use(createPinia());
app.use(router);

app.mount("#app");
