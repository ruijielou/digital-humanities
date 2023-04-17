// import 'nprogress/css/nprogress.css'; // 进度条样式
import { createRouter, createWebHashHistory } from 'vue-router';

import { createRouterGuards } from './router-guards';

import routes from './router';
const whiteNameList = ['home', 'CaseDetail']; //添加不用登录的页面name //暂时没用到，只判断了是否为我的页面和401的跳转

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});

export async function setupRouter(app:any) {
  // 创建路由守卫
  createRouterGuards(router, whiteNameList);

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}
export default router;
