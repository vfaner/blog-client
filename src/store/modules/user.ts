import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {LoginParam, UserInfo} from "@/api/user/userModel";
import {Result} from "@/http/request";
import {getInfoApi, loginApi} from "@/api/user/user";
import {getToken, getUserInfo, setExpireTime,setRoles, setToken, setUserId, setUserInfo} from "@/utils/auth";
//定义state类型
export type UserState = {
    token: string,
    userId: number | string,
    userInfo: UserInfo,
    permissions: string[]
}
//定义state
export const state: UserState = {
    token: getToken() ? getToken() : '',
    userId: 0,
    userInfo: getUserInfo() ? getUserInfo() : {id: 0, avatar: '',username:'', login_name: ''} as UserInfo,
    permissions: []
}
//定义mutations
export const mutations = {
    setToken(state: UserState, token: string) {
        state.token = token
        setToken(token)
    },
    setUserId(state: UserState, userId: number | string) {
        state.userId = userId
    },
    setRoles(state: UserState, roles: string[]) {
        state.permissions = roles
        setRoles(roles)
    },
    setUserInfo(state: UserState, userInfo: UserInfo) {
        state.userInfo = userInfo
        setUserInfo(userInfo)
    },
}
//定义actions
export const actions = {
    //获取用户信息
    getInfo({commit}: ActionContext<UserState, RootState>) {
        return new Promise(((resolve, reject) => {
            getInfoApi().then(res => {
                //设置权限信息到vuex
                console.log("获取用户信息getInfo")
                console.log(res)
                if (res.code == 200) {
                    commit('setRoles', res.data.roles)
                    commit('setUserInfo', res.data)
                }
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        }))
    },
    //登录
    login({commit}: ActionContext<UserState, RootState>, loginParam: LoginParam) {
        return new Promise<Result>(((resolve, reject) => {
            loginApi(loginParam).then(res => {
                const resData = (res.data as any);
                // 判断业务状态码，不是 HTTP 状态码
                if (resData && resData.code === 200) {
                    const userData = resData.data || resData;
                    const authorizationHeader = userData.token || res.headers['authorization'];
                    if (authorizationHeader) {
                        const loginUser: UserInfo = {
                            id: userData.id,
                            login_name: userData.nickName || userData.login_name,
                            username: userData.username,
                            avatar: userData.avatar,
                            roles: userData.roles
                        }
                        commit('setUserInfo', loginUser)
                        commit('setRoles', userData.roles)
                        commit('setToken', authorizationHeader)
                        commit('setUserId', userData.id)
                        setUserId(Number(userData.id))
                        setToken(authorizationHeader)
                        setUserInfo(loginUser)
                    }
                }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        }))
    }

}
//定义getters
export const getters = {
    //获取用户的权限字段
    getPermissions(state: UserState) {
        return state.permissions
    },
    getToken(state: UserState) {
        return state.token
    },
    getInfo(state: UserState) {
        return state.userInfo
    }
}
export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}
