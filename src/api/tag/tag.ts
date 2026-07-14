import http from "@/http/http"

import {AddTagModel} from "@/api/tag/TagModel";

enum Api {
    getList = 'rgh/api/tag/query',
    getPage = 'rgh/api/tag/page-query',
    addOrEdit = 'rgh/api/tag',
    delete = 'rgh/api/tag',
    listColor = 'rgh/api/tag/tag-cloud',
    listCount = 'rgh/api/tag/tag-count',
    getTagWithArticle = 'rgh/api/article/tag'
}

//标签列表
export const getTagListApi = async (param: any) => {
    return await http.get(Api.getList, param)
}

//标签列表
export const getTagColorApi = async (param: any) => {
    return await http.get(Api.listColor, param)
}
//标签下文章
export const getTagWithArticlesApi = async (param: string) => {
    return await http.getRestApi(Api.getTagWithArticle, param)
}
//标签分页
export const getTagPageApi = async (param: any) => {
    return await http.get(Api.getPage, param)
}
// 新增标签
export const addTagApi = async (param: any) => {
    return await http.post(Api.addOrEdit, param)
}
//编辑标签
export const editTagApi = async (param: AddTagModel) => {
    return await http.put(Api.addOrEdit, param)
}
//删除标签
export const deleteTagApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}

//侧栏标签
export const tagCountApi = async () => {
    return await http.get(Api.listCount)
}
