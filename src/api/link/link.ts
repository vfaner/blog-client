import http from "@/http/http";
import {AddLinkModel} from "@/api/link/linkModel";

enum Api {
    getPage = 'rgh/api/link/page-query',
    getList = 'rgh/api/link/query',
    delete = 'rgh/api/link',
    addOrEdit = 'rgh/api/link'
}

//友联分页
export const getLinkPageApi = async (param: any) => {
    return await http.get(Api.getPage, param)
}
//友联列表
export const getLinkListApi = async (param: any) => {
    return await http.get(Api.getList, param)
}
//删除友联
export const deleteLinkApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}
//添加友联
export const addLinkApi = async (param: AddLinkModel) => {
    return await http.post(Api.addOrEdit, param)
}
//修改友联
export const editLinkApi = async (param: AddLinkModel) => {
    return await http.put(Api.addOrEdit, param)
}
