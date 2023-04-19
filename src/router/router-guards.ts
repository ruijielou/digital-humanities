import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress';
import { Storage, TOKEN_KEY, to as _to } from '@/utils/config';
import { useUserStoreWithOut } from '@/store/user';

const userStore = useUserStoreWithOut();

NProgress.configure({ showSpinner: false });

export function createRouterGuards(router: any, whiteNameList: string[]) {
  router.beforeEach(async (to: any, _: any, next: any) => {
    NProgress.start();

    const token = Storage.get(TOKEN_KEY, undefined);
    /**
     * 如果包含了关于我的页面，未登录就打开login
     */
    if (!token && (to.path.includes('/about') || to.name === 'Contribute')) {
      userStore.openLogin();
      next({ name: 'home', replace: true });
    } else {
      if (token) {
        const [err] = await _to(userStore.afterLogin());
        // 如果获取用户信息失败，就清除token
        if (err) {
          userStore.resetToken();
        }
      }
      next();
    }
  });

  router.afterEach((to: any, from: any, failure: any) => {
    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }
    NProgress.done();
  });

  router.onError((error: Error) => {
    console.log(error, '路由错误');
  });
}
