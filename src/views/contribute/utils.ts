import {getDateFormatter} from "@/utils/config"

// 初始化数据结构 案例的编辑和提交
export const formatterFormInput = (props: any,sourceData?:any) => {
    if (!props.result) return { formModal: null }
    //初始化custom tag
    const data: any = {
        city_334: sourceData && sourceData['city_334'] ? sourceData['city_334'] : '',
        customTag: sourceData && sourceData['customTag'] ? sourceData['customTag'].split(',') : [],
        authType: sourceData && sourceData['authType'] ? sourceData['authType'] : 1,
    };
    const metaList = props.result.reduce((prev: any, cur: any) => {
        return cur.metaList ? [...prev, ...cur.metaList] : [...prev]
    }, []);

    const dateInstant: any = {}; //初始化日期格式的类型

    for (const item of metaList) {
    // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 13:选择输入框(推荐文本) 14:数据库选项 单选 15:数据库多选 16:标签 多选
        if ([6, 9, 13, 14, 15, 16, 17].includes(item.dataType)) {
            data[item.filed] = sourceData && sourceData[item.filed] ? sourceData[item.filed].split(',') : [];
        } else {
            data[item.filed] = sourceData && sourceData[item.filed] != undefined ? sourceData[item.filed] : "";
        }
        if(item.dataType === 3) {
            dateInstant[item.filed] = getDateFormatter(sourceData && sourceData[item.filed])
        }
    }
    return { formModal: data, dateInstant }
}