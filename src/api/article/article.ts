import http from "@/http/http"

import {
    AddArticleModel,
    ArticleIdParam,
    ArticleSearchParam,
    CardParam,
    RandomOrHotPram
} from "@/api/article/ArticleModel";
import {LocationQueryValue} from "vue-router";

enum Api {
    getPage = 'rgh/api/article/page-query',
    getList = 'rgh/api/article/search',
    addOrEdit = 'rgh/api/article',
    delete = 'rgh/api/article',
    getOne = 'rgh/api/article',
    getListShow = 'rgh/api/article/list_show',
    getRandomShow = 'rgh/api/article/random',
    getCateLimit = 'rgh/api/article/category',
    like = 'rgh/api/article/like'

}

//文章分页
export const getArticlePageApi = async (param: any) => {
    return await http.get(Api.getPage, param)
}

//文章分页
export const getArticleKeyWord = async (param: any) => {
    return await http.get(Api.getList, param)
}

//查询指定文章
export const getOneApi = async (param: string | LocationQueryValue[]) => {
    return await http.getRestApi(Api.getOne, param)
}
//查询标签指定文章
export const getArticleByTagApi = async (param: string | LocationQueryValue[]) => {
    return await http.getRestApi(Api.getOne, param)
}
//新增文章
export const addArticleApi = async (param: AddArticleModel) => {
    return await http.post(Api.addOrEdit, param)
}
//编辑文章
export const editArticleApi = async (param: AddArticleModel) => {
    return await http.put(Api.addOrEdit, param)
}
//删除文章
export const deleteArticleApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}
//首页列表展示
export const getListShowApi = async (param: any) => {
    return await http.get(Api.getListShow, param)
}

// type:2热门/1随机/0最新
export const getRandomShowApi = async (param: RandomOrHotPram) => {
    return await http.get(Api.getRandomShow, param)
}

// cateId分类id,limit数量限制
export const getArticleCateLimitApi = async (param: CardParam) => {
    return await http.get(Api.getCateLimit, param)
}

// 文章点赞
export const likeArticleApi = async (id: number|string) => {
    return await http.put(`${Api.like}/${id}`, {})
}
