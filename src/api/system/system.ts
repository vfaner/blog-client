import http from "@/http/http"
import {ConfigModel} from "@/api/system/SystemModel";

enum Api {
    getConfig = 'rgh/api/sys/read',
    writeConfig = 'rgh/api/sys/write',
    homeCardRender = 'rgh/api/home-card/render',
    homeCardList = 'rgh/api/home-card/list',
    homeCard = 'rgh/api/home-card',
}

//获取系统配置
export const getConfigApi = async () => {
    return await http.get(Api.getConfig)
}
//修改系统配置
export const modifyConfigApi = async (param: ConfigModel) => {
    return await http.put(Api.writeConfig, param)
}
//首页渲染卡片
export const getHomeCardRenderApi = async () => {
    return await http.get(Api.homeCardRender)
}
//所有卡片配置
export const getHomeCardListApi = async () => {
    return await http.get(Api.homeCardList)
}
//新增卡片
export const addHomeCardApi = async (param: any) => {
    return await http.post(Api.homeCard, param)
}
//更新卡片
export const updateHomeCardApi = async (param: any) => {
    return await http.put(Api.homeCard, param)
}
//删除卡片
export const deleteHomeCardApi = async (param: any) => {
    return await http.delete(Api.homeCard, param)
}
