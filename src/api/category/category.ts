import http from "@/http/http"

import {AddCategoryModel} from "@/api/category/CategoryModel";

enum Api {
    getList = 'rgh/api/category/query',
    getPage = 'rgh/api/category/page-query',
    addOrEdit = 'rgh/api/category',
    delete = 'rgh/api/category',
    getListWithArticle = 'rgh/api/article/category'
}

//分类列表
export const getCategoryListApi = async (param: any) => {
    return await http.get(Api.getList, param)
}
//分类分页
export const getCategoryPageApi = async (param: any) => {
    return await http.get(Api.getPage, param)
}
//分类下文章
export const getCategoryWithArticlesApi = async (param: string|number) => {
    return await http.getRestApi(Api.getListWithArticle, param)
}
//新增分类
export const addCategoryApi = async (param: AddCategoryModel) => {
    return await http.post(Api.addOrEdit, param)
}
//编辑分类
export const editCategoryApi = async (param: AddCategoryModel) => {
    return await http.put(Api.addOrEdit, param)
}
//删除分类
export const deleteCategoryApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}
