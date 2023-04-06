const storage = localStorage; //存在本地

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