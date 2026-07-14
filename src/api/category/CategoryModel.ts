export interface CategorySearchParam {
    name: string;
    alias: string;
    pageNum: number;
    pageSize: number;
}


/**
 * 新增分类参数
 */
export interface AddCategoryModel {
    id?: number|string;
    name: string;
    alias: string;
    description: string;
    type: string //区分新增编辑
}

/**
 * 查询某一个分类带文章
 */
export interface CateWithArticle {
    cateId: number|string
    cateName?:string
    articleVo:[]
}
