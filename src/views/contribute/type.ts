export interface GroupDataItem {
    title: string;
    repositoryList: any[];

}
export enum CaseType {
    Custom,
    System
}

export interface MetaItem {
    dataType: number;
    groupId: number;
    id: number;
    isRequired: number;
    name: string;
    opts: string;
    parentId: number | null;
    refId: number | null;
    subType: number;
}

/**
 * @add 可在后边添加的属性
 * @inline 一行显示的表单
 */
export const StepTwoForm = {
    introduction: {
        title: '项目简介',
        formCols: [
            {
                name: '项目名称',
                key: 'name',
                type: 'text'
            },
            {
                name: '网站链接',
                key: 'link',
                type: 'text'
            },
            {
                name: '主题',
                key: 'theme',
                type: 'text'
            },
            {
                name: '启动时间',
                key: 'startTime',
                type: 'time'
            },
            {
                name: '所属国别',
                key: 'region',
                type: 'select'
            },
            {
                name: '项目摘要',
                key: 'summary',
                type: 'textare'
            },
            {
                name: '数据集',
                key: 'dataset',
                type: 'textare'
            },
            {
                name: '项目目标',
                key: 'objectives',
                type: 'textare'
            },
            {
                name: '项目意义',
                key: 'significance',
                type: 'textare'
            },
            {
                name: '预期成果',
                key: 'expectedResults',
                type: 'textare'
            },
        ],
    },
    organization: {
        title: '项目机构',
        formCols: [
            {
                name: '所属机构',
                key: 'organization',
                add: true,
                type: 'text'
            },
            {
                name: '合作机构',
                key: 'partners',
                add: true,
                type: 'text'
            },
            {
                name: '资助机构',
                key: 'financial',
                type: 'text',
                add: true,
            },
        ]
    },
    personnel: {
        title: '项目人员',
        formCols: [
            {
                inline: true,
                add: true,
                name: '项目人员',
                data: [
                    {
                        name: '项目作者',
                        key: 'author',
                        type: 'text'
                    },
                    {
                        name: '主要作者身份',
                        key: 'authorIdentity',
                        type: 'text'
                    }
                ]
            },

        ]
    },
    results: {
        title: '项目成果',
        formCols: [
            {
                name: '项目成果',
                key: 'projectResults',
                add: true,
                type: 'text'
            }
        ]
    },
    // labels: {
    //     title: '标签（可多选）',
    //     formCols: [
    //         {
    //             noLabel: true,
    //             key: 'labels',
    //             add: true,
    //             type: 'text',
    //             data: [
    //                 []
    //             ]
    //         }
    //     ]
    // },
}