export interface TagSearchParam {
    name: string;
    alias: string;
    pageNum: number;
    pageSize: number;
}


/**
 * 新增分类参数
 */
export interface AddTagModel {
    id?: number|string;
    name: string;
    alias: string;
    description: string;
    type: string //区分新增编辑
}

/**
 * 查询某一个标签带文章
 */
export interface TagWithArticle {
    tagId: number|string
    tagName?:string
    articleVo:[]
}
