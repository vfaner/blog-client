import http from "@/http/http";
import {EditUserModel, LoginParam, LoginResult, RegUserModel, UserInfo} from "@/api/user/userModel";
import {AddUserModel} from "@/api/user/userModel";

enum Api {
    getImg = 'captcha',
    login = 'rgh/api/login',
    getInfo = 'rgh/api/user/getInfo',
    getList = 'rgh/api/user/page-query',
    addOrEditOrDelete = 'rgh/api/user',
    loginOut = 'rgh/api/logout',
    restore = 'rgh/api/restore'
}

//获取验证码
export async function getImagApi() {
    return await http.getImage(Api.getImg)
}

//登录
export async function loginApi(params: LoginParam) {
    console.log(params)
    return http.login<LoginResult>(Api.login, params)
}
//获取用户信息
export const getInfoApi = async() => {
    return await http.get<UserInfo>(Api.getInfo)
}
//用户分页
export const getUserPageApi = async (param: any) => {
    return await http.get(Api.getList, param)
}
//新增用户
export const addUserApi = async (param: AddUserModel|RegUserModel) => {
    return await http.post(Api.addOrEditOrDelete, param)
}
//编辑用户
export const editUserApi = async (param: AddUserModel|EditUserModel) => {
    return await http.put(Api.addOrEditOrDelete, param)
}
//删除用户
export const deleteUserApi = async (param: any) => {
    return await http.delete(Api.addOrEditOrDelete, param)
}
//退出登录
export const loginOutApi = async (param: any) => {
    return await http.post(Api.loginOut, param)
}
//还原数据
export const restoreApi = async (param: any) => {
    return await http.post(Api.restore, param)
}
