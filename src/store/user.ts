import { defineStore } from 'pinia';
import { store } from './index';
import { Storage,TOKEN_KEY } from '@/utils/config';
import { LoginByUser } from '@/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: localStorage[TOKEN_KEY],
    name: 'amdin',
    userInfo: {},
    enumMap: {}
  }),
  actions: {
    resetToken() {
      this.token = this.name = '';
      this.userInfo = {};
      Storage.clear();
    },

    setToken(token:string) {
      this.token = token ?? '';
      Storage.set(TOKEN_KEY, this.token);
    },

    /** 登录 */
    async login (params:{username: string, password: string}) {
      try {
        const data = await LoginByUser(params);
        this.setToken(data.result.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /** 获取用户信息 */
    async afterLogin() {
      try {

        // 在这儿调用获取用户信息的接口 return获取到的数据

        return {  };
      } catch (error) {
        return Promise.reject(error);
        return this.logout();
      }
    },

    /** 退出登陆 */
    async logout() {
      this.resetToken();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
