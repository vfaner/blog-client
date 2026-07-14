export interface ArticleSearchParam {
    title: string;
    author: string;
    pageNum: number;
    pageSize: number;
}

export interface ArticleIdParam {
    id?:String
}

/**
 * 新增文章参数
 */
export interface AddArticleModel {
    id?: number|string,
    title: string,
    author?: string,
    cover?: string,
    content: string,
    categories?: [],
    tags?: [],
    state?: number,
    downloadEnable?: boolean,
    downloadName?: string,
    downloadUrl?: string,
    downloadSize?: string,
    downloadDesc?: string,
    type: string //区分新增编辑
}

/**
 * 随机/热门/最新文章参数
 */
export interface RandomOrHotPram {
    type:string;
    limit: number;
}
/**
 * 首页迷你卡片参数
 */
export interface CardParam {
    cateId:string|number;
    limit?: number;
}
