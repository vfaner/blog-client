import http from "@/http/http"
import {AddRoleModel, AssignSaveParam, AssignTreeParam, RoleListParam} from "./RoleModel"

enum Api {
    getList = 'rgh/api/role/query',
    getPage = 'rgh/api/role/page-query',
    addOrEdit = 'rgh/api/role',
    delete = 'rgh/api/role',
    assignTree = 'rgh/api//role/getAssignPermissionTree',
    assignSave = 'rgh/api/role/roleAssignSave'
}

//角色列表
export const getRolePageApi = async (param: any) => {
    return await http.get(Api.getPage, param)
}
//全部角色
export const getRoleListApi = async () => {
    return await http.get(Api.getList, {})
}
//新增角色
export const addRoleApi = async (param: AddRoleModel) => {
    return await http.post(Api.addOrEdit, param)
}
//编辑角色
export const editRoleApi = async (param: AddRoleModel) => {
    return await http.put(Api.addOrEdit, param)
}
//删除角色
export const deleteRoleApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}
//分配权限树的数据
export const assignTreeApi = async (param: AssignTreeParam) => {
    return await http.get(Api.assignTree, param)
}
//分配权限保存
export const assignSaveApi = async (param: AssignSaveParam) => {
    return await http.post(Api.assignSave, param)
}
