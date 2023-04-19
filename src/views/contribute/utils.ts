// 初始化数据结构
export const formatterFormInput = (props: any) => {
    if (!props.result) return { formModal: null }
    const data: any = {};
    const metaList = props.result.reduce((prev: any, cur: any) => {
        return cur.metaList ? [...prev, ...cur.metaList] : [...prev]
    }, []);

    for (const item of metaList) {
    // 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接 13:选择输入框(推荐文本) 14:数据库选项 单选 15:数据库多选 16:标签 多选
        if ([6, 9, 13, 15, 16, 17].includes(item.dataType)) {
            data[item.filed] = [];
        } else {
            data[item.filed] = "";
        }
    }
    return { formModal: data }
}
