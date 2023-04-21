const storage = localStorage; //存在本地

type AnyObject<T = any> = {
  [key: string]: T | any;
};
export const TOKEN_KEY = "TOKEN";

export const Storage = {
  get: (key: string, def?: string) => {
    const item = storage.getItem(key);
    if (item) {
      try {
        const data = JSON.parse(item);
        if (data) {
          return data;
        }
        storage.removeItem(key);
      } catch (e) {
        return def;
      }
    }
    return def;
  },
  set: (key: string, value: string) => {
    const stringData = JSON.stringify(value);
    storage.setItem(key, stringData);
  },
  remove: (key: string) => {
    storage.removeItem(key);
  },
  clear: () => {
    storage.clear();
  },
};

/**
 * 将路径中重复的正斜杆替换成单个斜杆隔开的字符串 避免多拼斜杠
 * @param path 要处理的路径
 * @returns {string} 将/去重后的结果
 */
export const uniqueURI = (path: string) => path.replace(/(https?:\/)|(\/)+/g, "$1$2");


/**
 * reference https://github.com/scopsy/await-to-js
 * @description 捕获错误的方法， 对多个异步回掉进行错误捕获，如果有错误才返回err
 * @param { Promise } promise
 * @param { Object= } errorExt -
 * @return { Promise }
 */
export const to = (promise: any, errorExt?: any) => {
  return promise
    .then((data: any) => [null, data])
    .catch((err: any) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }
      return [err, undefined];
    });
};

export const uuid = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  let uuid = s.join("");
  return uuid;
}

export const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export const formatterFormInput = (props: any) => {
  if (!props.result) return { formModal: null }
  const data: any = {};
  for (const item of props.result) {
    // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 13:选择输入框(推荐文本) 14:数据库选项  多选 15:数据库多选 16:标签 多选
    if ([6, 9, 13, 14, 15, 16, 17].includes(item.dataType)) {
      data[item.filed] = []; //初始化多选值
    } else {
      data[item.filed] = "";
    }
  }
  //  1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接
  return { formModal: data }
}

export const formatterFormData = (data: AnyObject) => {
  const newFormData: AnyObject = {};
  for (const key in data) {
    if (data[key] != undefined && data[key] != "") {
      if (data[key].constructor == Array) {
        newFormData[key] = data[key].map((item: any) => item).join(",");
      } else {
        newFormData[key] = data[key];
      }
    }
  }
  return { ...newFormData };
};
// 【所有文件上传地址 回显 增加前缀  
export const imgBaseUrl = '/app/common/static/'
// https://www.tapd.cn/44529296/bugtrace/bugs/view/1144529296001000140'

export const isNotEmpty = (value: number | string | null | undefined): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'number' && isNaN(value)) {
    return false;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }

  return true;
}