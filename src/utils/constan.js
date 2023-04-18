/**
 * 常量对象
 */
function Constant(code, name, desc) {
  this.code = code;
  if (name != undefined) {
    this.name = name;
    if (desc != undefined) {
      this.desc = desc;
    }
  }
}

/**
 * 经常用的常量
 */
var commonConstant = {
  /**
   * 是
   */
  YES: new Constant(1, "是"),
  /**
   * 否
   */
  NO: new Constant(2, "否"),
  /**
   * 成功
   */
  SUCCESS: new Constant(1, "成功"),
  /**
   * 失败
   */
  FAILURE: new Constant(2, "失败"),
};
/**
 * 经常用的常量
 */
var BooleanConstant = {
  /**
   * 是
   */
  YES: new Constant(1, "是"),
  /**
   * 否
   */
  NO: new Constant(2, "否"),
};
/**
 * 系统相关常量
 */
var SystemConstant = {
  /**
   * saas服务名称
   */
  SAAS_DESC: "saas服务名称",
  ARTICLE_TYPES_DICT_ID: "1363740043927126017",
  /* 图片前缀 */
  IMG_PREFIX: "http://naodao.api.lipengwencai.com/sys/common/static/",
};

/**
 * 性别类型
 */
var SexType = {
  /**
   * 是
   */
  MAN: new Constant(1, "男"),
  /**
   * 否
   */
  WOMEN: new Constant(2, "女"),
};

function format_date(value, fmt) {
  if (value && fmt) {
    const $this = new Date(value);
    const o = {
      "M+": $this.getMonth() + 1,
      "d+": $this.getDate(),
      "h+": $this.getHours(),
      "m+": $this.getMinutes(),
      "s+": $this.getSeconds(),
      "q+": Math.floor(($this.getMonth() + 3) / 3),
      S: $this.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        ($this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  } else {
    return "";
  }
}
/** 格式化id */
function format_id(value, length, prefix, pad) {
  return (prefix || "") + (value + "").padStart(length || 10, pad || 0);
}
/**
 * 计算距离现在的时间间隔, 超过2天格式化显示
 * @param {Object} value
 * @param {Object} fmt
 */

function get_time_until_now(value, fmt) {
  var mss = new Date().getTime() - new Date(value).getTime();
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  if (days > 2) {
    return format_date(value, fmt);
  }
  if (days > 0) {
    return days + " 天前";
  }
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours > 0) {
    return hours + " 小时前 ";
  }
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes > 0) {
    return minutes + " 分钟前 ";
  }
  var seconds = (mss % (1000 * 60)) / 1000;
  return "刚刚 ";
}
/**
 * 计算时间间隔
 * @param {Object} start
 * @param {Object} end
 */
function get_time_interval(start, end) {
  let startTime = new Date(start).getTime(); // 开始时间
  let endTime = new Date(end).getTime(); // 结束时间
  let usedTime = endTime - startTime; // 相差的毫秒数
  let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
  let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
  let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
  let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
  let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
  let leavel3 = (leavel2 % (60 * 1000)) / 1000;
  if (days > 0) {
    return days + "天" + hours + "时";
  } else if (hours > 0) {
    return hours + "时" + minutes + "分";
  } else if (minutes > 0) {
    return minutes + "分" + leavel3 + "秒";
  } else {
    return leavel3 + "秒";
  }
}
/**
 * 将金额转换成万
 */
function convert_price_to_thousand(text) {
  return text ? (text / 10000).toFixed(1) + "万" : "";
}
/**
 * 将金额转换成万
 */
function convert_price(text) {
  return text ? text + "万" : "";
}

var AuthType = {
  /** 公开  */
  PUBLIC: new Constant(1, "公开"),
  /** 仅自己看  */
  PRIVATE: new Constant(2, "仅自己看"),
  /** 默认字段  */
  DEFAULT: new Constant(3, "默认字段"),
};

/** 状态 1:正常, 2:黑名单 3:未认证  */
var DhuUserStatus = {
  /** 正常  */
  NORMAL: new Constant(1, "正常"),
  /** 黑名单  */
  BLACK: new Constant(2, "黑名单"),
  /** 未认证  */
  UN_AUTH: new Constant(3, "未认证"),
};

/** 状态 1:未认证 2:已认证  */
var DhuUserAuthStatus = {
  /** 未认证  */
  UN_AUTH: new Constant(1, "未认证"),
  /** 已认证  */
  AUTH: new Constant(2, "已认证"),
};

/** 状态 1: 暂存 2:待审核, 3:审核通过 4:未通过 5:删除  */
var DhcRepositoryStatus = {
  /** 暂存  */
  NEW: new Constant(1, "暂存"),
  /** 待审核  */
  VERIFY: new Constant(2, "待审核"),
  /** 审核通过  */
  PASS: new Constant(3, "发布"),
  /** 未通过  */
  UN_PASS: new Constant(4, "未通过"),
  /** 删除  */
  DEL: new Constant(5, "删除"),
};

/** 状态 1: 暂存 2:待审核, 3:审核通过 4:未通过 5:删除  */
var DhcCaseStatus = {
  /** 暂存  */
  NEW: new Constant(1, "暂存"),
  /** 待审核  */
  VERIFY: new Constant(2, "待审核"),
  /** 审核通过  */
  PASS: new Constant(3, "发布"),
  /** 未通过  */
  UN_PASS: new Constant(4, "未通过"),
  /** 删除  */
  DEL: new Constant(5, "删除"),
};
/** 状态 1: 暂存 2:发布 3:删除  */
var DhcMetaStatus = {
  /** 暂存  */
  NEW: new Constant(1, "暂存"),
  /** 发布  */
  PASS: new Constant(2, "发布"),
  /** 删除  */
  DEL: new Constant(3, "删除"),
};
/** 类型  1:收藏 2:点赞  */
var DhuFavoriteType = {
  /** 收藏  */
  FAVORITE: new Constant(1, "收藏"),
  /** 点赞  */
  LIKE: new Constant(2, "点赞"),
};

/** 创建类型, 1:管理员创建 2:用户创建  */
var CreateType = {
  /** 管理员创建  */
  ADMIN: new Constant(1, "管理员创建"),
  /** 用户创建  */
  USER: new Constant(2, "用户创建"),
};

/** 字段格式 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接  */
var DhcMetaEntityDataType = {
  /** 单行文本  */
  INPUT: new Constant(1, "单行文本"),
  /** 多行文本  */
  TEXTAREA: new Constant(2, "多行文本"),
  /** 日期时间  */
  DATETIME: new Constant(3, "日期时间"),
  /** 数字  */
  NUMBER: new Constant(4, "数字"),
  /** 单选  */
  RADIOBOX: new Constant(5, "单选"),
  /** 多选  */
  CHECKBOX: new Constant(6, "多选"),
  /** 下拉框  */
  SELECT: new Constant(7, "下拉框"),
  /** 地址  */
  ADDR: new Constant(8, "地址"),
  /** 图片  */
  IMG: new Constant(9, "图片"),
  /** 手机号  */
  TEL: new Constant(10, "手机号"),
  /** 邮箱  */
  EMAIL: new Constant(11, "邮箱"),
  /** 链接  */
  HREF: new Constant(12, "链接"),
  /** 单行文本  */
  INPUT_SELECT: new Constant(13, "单行文本"),
};

/** 类型 1:元数据 2:附属元数据  */
var DhcMetaEntitySubType = {
  /** 元数据  */
  META: new Constant(1, "元数据"),
  /** 附属元数据  */
  SUB_META: new Constant(2, "附属元数据"),
};

/** 元数据分类 */
var MetaGroupConstant = {
  /** 项目简介  */
  ITEM_DESC: new Constant(2, "项目简介"),
  /** 项目机构  */
  ITEM_ORG: new Constant(3, "项目机构"),
  /** 项目人员  */
  ITEM_MEMBER: new Constant(4, "项目人员"),
  /** 标签  */
  LAB: new Constant(5, "标签"),
  /** 技术  */
  TECHNOLOGY: new Constant(6, "技术"),
  /** 关联项目  */
  RELATION: new Constant(7, "关联项目"),
  /** 人物  */
  PERSON: new Constant(8, "人物"),
  /** 地理位置  */
  LOCATION: new Constant(9, "地理位置"),
  /** 组织机构  */
  ORG: new Constant(10, "组织机构"),
  /** 朝代时间  */
  TIME_LINE: new Constant(11, "朝代时间"),
};

export default {
  getConstOpts,
  getConstName,
  commonConstant,
  BooleanConstant,
  SystemConstant,
  get_time_until_now,
  get_time_interval,
  format_date,
  AuthType,
  DhcRepositoryStatus,
  DhuUserStatus,
  DhuUserAuthStatus,
  format_id,
  DhuFavoriteType,
  CreateType,
  DhcMetaEntityDataType,
  DhcMetaEntitySubType,
  DhcMetaStatus,
  DhcCaseStatus,
  MetaGroupConstant,
};
/**
 * 获取常量作为选项的设置
 */
function getConstOpts(constant) {
  var opts = [];
  for (var name in constant) {
    var obj = constant[name];
    opts.push({ value: obj.code, label: obj.name });
  }
  return opts;
}
// function build_opts(constant){
//   let desc = [];
//   for(var name in constant){
//     let obj = constant[name];
//     if(obj.code == code){
//       desc = obj.name;
//     }
//     desc.push({ label:obj.name, value: obj.code })
//   }
//   return desc;
// }
/**
 * 获取常量名称描述
 */
function getConstName(code, constant) {
  var desc = null;
  for (var name in constant) {
    var obj = constant[name];
    if (obj.code == code) {
      desc = obj.name;
    }
  }
  if (!desc) {
    desc = "--";
  }
  return desc;
}
