import axios from "axios";
import { message as $message } from "ant-design-vue";
import { Storage, TOKEN_KEY, uniqueURI } from "./config";
import NProgress from "nprogress"; // progress
const UNKNOWN_ERROR = "未知错误，请重试";
NProgress.configure({ showSpinner: false }); // NProgress 
import { useUserStoreWithOut } from '@/store/user';

/** 请求的前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API;

const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    const token = Storage.get(TOKEN_KEY);
    
    if (token && config.headers) {
      config.headers["X-Access-Token"] = token;
    }
    if(config.url?.includes('common/upload')){
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { data, status } = response;
     if (!data.success) {
      $message.error(data.message || UNKNOWN_ERROR);

      //window.localStorage.clear(); 是否要刷新页面，后边根据情况再加判断
      //window.location.reload();

      // error
      const error:any = new Error(data.message || UNKNOWN_ERROR);
      error['code'] = status;
      return Promise.reject(error);
    } else {
      return data;
    }
  },
  (error) => {
    // 处理 400 或者 500 的错误异常提示
    console.log(error?.response);
    
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
    const statusCode = error?.response?.status ?? ''
    if(statusCode === 401) {
      const userStore = useUserStoreWithOut();
      userStore.resetToken();
      userStore.openLogin();
    }
    $message.error(errMsg);
    error.message = errMsg;
    return Promise.reject(error);
  }
);

/**
 * @config
 * @param method - 请求方式
 * @param url - 请求地址
 * @param data - 请求的参数
 */
export const request = async (config:any) => {
  try {
    NProgress.start();
    const fullUrl = `${baseApiUrl + config.url}`;
    config.url = uniqueURI(fullUrl);

    const res = await service.request(config);

    const { successMsg, errorMsg } = res as any;
    successMsg && $message.success(successMsg);
    errorMsg && $message.error(errorMsg);
    NProgress.done();
    return res.data || res;
  } catch (error) {
    NProgress.done();
    return Promise.reject(error);
  }
};
