// import 'nprogress/css/nprogress.css'; // 进度条样式
import { createRouter, createWebHashHistory } from 'vue-router';

import { createRouterGuards } from './router-guards';

import routes from './router';
const whiteNameList = ['About'];

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
