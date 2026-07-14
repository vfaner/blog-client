import {UserInfo} from "@/api/user/userModel";
import {ConfigModel} from "@/api/system/SystemModel";

enum Keys{
    Token = 'token',
    UserId = 'userId',
    ExpireTime = 'expireTime',
    UserInfo = 'userInfo',
    SystemConfig = 'system'
}
//存储token到session
export const setToken = (token: string) => {
    if (token) sessionStorage.setItem(Keys.Token, token)
    else sessionStorage.removeItem(Keys.Token)
}
export const getToken = () => {
    return sessionStorage.getItem(Keys.Token) || ''
}
//存储userId到sessionStorage
export const setUserId = (userId:number)=>{
    sessionStorage.setItem(Keys.UserId,JSON.stringify(userId))
}
export const getUserId = ()=>{
    return sessionStorage.getItem(Keys.UserId)
}

//存储userInfo到sessionStorage
export const setUserInfo = (userInfo:UserInfo)=>{
    sessionStorage.setItem(Keys.UserInfo,JSON.stringify(userInfo))
}
export const setRoles = (roles:string[])=>{
    return sessionStorage.setItem("roles",JSON.stringify(roles))
}
export const getUserInfo = (): UserInfo | null => {
    const raw = sessionStorage.getItem(Keys.UserInfo)
    if (!raw || raw === 'undefined') return null
    try { return JSON.parse(raw) } catch { return null }
}
//存储过期时间
export const setExpireTime = (time:number)=>{
    sessionStorage.setItem(Keys.ExpireTime,JSON.stringify(time))
}
export const getExpireTime = ()=>{
    return sessionStorage.getItem(Keys.ExpireTime)
}

//session清空
export const cleanSession = () => {
    sessionStorage.clear()
}
//更新网站设置
export const setSystemConfig = (config: ConfigModel)=>{
    sessionStorage.setItem(Keys.SystemConfig,JSON.stringify(config))
}
//获取网站设置
export const getSystemConfig = ()=>{
    return JSON.parse(<string>sessionStorage.getItem(Keys.SystemConfig))
}
