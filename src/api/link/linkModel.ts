export interface LinkSearchParam {
    name: string;
    pageNum: number;
    pageSize: number;
}


/**
 * 新增友联参数
 */
export interface AddLinkModel {
    id?: number|string;
    name: string;
    link: string;
    description: string;
    enable: boolean;
    type: string //区分新增编辑
}
