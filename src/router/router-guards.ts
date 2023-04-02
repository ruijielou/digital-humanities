import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress';
import { Storage, TOKEN_KEY } from '@/utils/config';
import { useUserStoreWithOut } from '@/store/user';

const userStore = useUserStoreWithOut();

NProgress.configure({ showSpinner: false }); // NProgress Configuration

export function createRouterGuards(router: any, whiteNameList: string[]) {
  router.beforeEach(async (to, _, next) => {
    NProgress.start();

    const token = Storage.get(TOKEN_KEY, null);
    if (!token && to.path.includes('/about')) {
      userStore.openLogin();
      // return
      next('/');
    } else {
      next();
    }
  });

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }
    NProgress.done();
  });

  router.onError((error: Error) => {
    console.log(error, '路由错误');
  });
}
