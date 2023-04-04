// import { MetaItem } from "./type"
export const formatterFormInput = (props: any) => {
    if (!props.result) return { formModal: null }
    const data: any = {};
    const metaList = props.result.reduce((prev: any, cur: any) => {
        return cur.metaList ? [...prev, ...cur.metaList] : [...prev]
    }, []);

    for (const item of metaList) {
        if (item.dataType === 13) {
            //如果是输入多个值， 初始化为数组
            data[item.filed] = {
                [`${item.filed}_1`]: '',
            };
        } else if (item.dataType === 14 || item.dataType === 6) {
            data[item.filed] = [];
        } else {
            data[item.filed] = "";
        }
    }

    //  1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接
    return { formModal: data }
}

const data = {
    "labList": [
        {
            "id": 12,
            "title": "学科",
            "colorValue": null,
            "opts": [
                {
                    "id": 19,
                    "title": "物理",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 21,
                    "title": "生物",
                    "colorValue": "0096c7",
                    "opts": null
                }
            ]
        },
        {
            "id": 13,
            "title": "服务对象",
            "colorValue": null,
            "opts": [
                {
                    "id": 22,
                    "title": "科研机构",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 23,
                    "title": "企业",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 24,
                    "title": "政府",
                    "colorValue": null,
                    "opts": null
                }
            ]
        },
        {
            "id": 14,
            "title": "研究方向",
            "colorValue": null,
            "opts": [
                {
                    "id": 25,
                    "title": "人文环境",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 26,
                    "title": "风土人情",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 27,
                    "title": "餐饮美食",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 28,
                    "title": "计算机视觉",
                    "colorValue": null,
                    "opts": null
                },
                {
                    "id": 30,
                    "title": "标题颜色",
                    "colorValue": "ff9800",
                    "opts": null
                },
                {
                    "id": 31,
                    "title": "用户级别1",
                    "colorValue": "ff5c93",
                    "opts": null
                },
                {
                    "id": 32,
                    "title": "红色标签",
                    "colorValue": "0960bd",
                    "opts": null
                },
                {
                    "id": 34,
                    "title": "蓝色标签",
                    "colorValue": "009688",
                    "opts": null
                }
            ]
        }
    ],
    "metaList": [
        {
            "id": 329,
            "groupId": 2,
            "parentId": null,
            "name": "项目名称",
            "subType": 1,
            "dataType": 1,
            "opts": null,
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 330,
            "groupId": 2,
            "parentId": null,
            "name": "网站链接",
            "subType": 1,
            "dataType": 12,
            "opts": null,
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 331,
            "groupId": 2,
            "parentId": null,
            "name": "主题",
            "subType": 1,
            "dataType": 1,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 332,
            "groupId": 2,
            "parentId": null,
            "name": "启动时间",
            "subType": 1,
            "dataType": 3,
            "opts": null,
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 333,
            "groupId": 2,
            "parentId": null,
            "name": "所属国家",
            "subType": 1,
            "dataType": 7,
            "opts": "中国;美国;日本;韩国;",
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 334,
            "groupId": 2,
            "parentId": null,
            "name": "所属城市",
            "subType": 1,
            "dataType": 7,
            "opts": "北京;上海;深圳;",
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 335,
            "groupId": 2,
            "parentId": null,
            "name": "项目摘要",
            "subType": 1,
            "dataType": 2,
            "opts": null,
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 336,
            "groupId": 2,
            "parentId": null,
            "name": "数 据 集",
            "subType": 1,
            "dataType": 2,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 337,
            "groupId": 2,
            "parentId": null,
            "name": "项目目标",
            "subType": 1,
            "dataType": 2,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 338,
            "groupId": 2,
            "parentId": null,
            "name": "项目意义",
            "subType": 1,
            "dataType": 2,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 339,
            "groupId": 2,
            "parentId": null,
            "name": "预期成果",
            "subType": 1,
            "dataType": 2,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 340,
            "groupId": 3,
            "parentId": null,
            "name": "所属机构",
            "subType": 1,
            "dataType": 13,
            "opts": "北京帛丝云商;0;2",
            "refId": null,
            "isRequired": 1
        },
        {
            "id": 341,
            "groupId": 3,
            "parentId": null,
            "name": "合作机构",
            "subType": 1,
            "dataType": 13,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 342,
            "groupId": 3,
            "parentId": null,
            "name": "资助机构",
            "subType": 1,
            "dataType": 13,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 343,
            "groupId": 4,
            "parentId": null,
            "name": "项目作者",
            "subType": 1,
            "dataType": 1,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 344,
            "groupId": 4,
            "parentId": null,
            "name": "主要作者身份",
            "subType": 1,
            "dataType": 1,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 345,
            "groupId": 6,
            "parentId": null,
            "name": "应用技术",
            "subType": 1,
            "dataType": 1,
            "opts": null,
            "refId": null,
            "isRequired": 2
        },
        {
            "id": 346,
            "groupId": 7,
            "parentId": null,
            "name": "关联项目",
            "subType": 1,
            "dataType": 14,
            "opts": null,
            "refId": null,
            "isRequired": 2
        }
    ]
}