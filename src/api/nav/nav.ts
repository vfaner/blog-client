import http from "@/http/http";
import {AddMenuModel} from "@/api/nav/NavModel";

enum Api {
    // getNavList = 'rgh/api/sysUser/getNavList',
    getNavList = 'rgh/api/nav/list',
    getTable = 'rgh/api/nav/list',
    getParent = 'rgh/api/nav/parent',
    addOrEdit = 'rgh/api/nav',
    delete = 'rgh/api/nav'
}

//获取菜单
export const getNavListApi = async () => {
    return await http.get(Api.getNavList)
}

// 获取菜单列表
export const getMenuTableApi = async () => {
    return await http.get(Api.getTable)
}
//获取上级菜单
export const getMenuParentApi = async () => {
    return await http.get(Api.getParent)
}
//新增权限
export const addMenuApi = async (param: AddMenuModel) => {
    return await http.post(Api.addOrEdit,param)
}
//编辑权限
export const editMenuApi = async (param: AddMenuModel) => {
    return await http.put(Api.addOrEdit,param)
}
export const deleteMenuApi = async (id:number) => {
    return await http.delete(Api.addOrEdit,{id:id})
}
