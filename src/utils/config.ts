const storage = localStorage; //存在本地

export const TOKEN_KEY = "TOKEN";

export const Storage = {
  get: (key:string, def?: string) => {
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
  set: (key:string, value:string) => {
    const stringData = JSON.stringify(value);
    storage.setItem(key, stringData);
  },
  remove: (key:string) => {
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
export const uniqueURI = (path:string) => path.replace(/(https?:\/)|(\/)+/g, "$1$2");

