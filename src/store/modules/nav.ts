//定义state
import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {getNavListApi} from "@/api/nav/nav";
import {RouteRecordRaw} from "vue-router";
import Common from '@/common/Index.vue';

const modules = import.meta.glob('../../common/**/*.vue')
export type NavState = {
    navList: any
}
export const state: NavState = {
    navList: []
}
//定义mutations
export const mutations = {
    //设置 navList（替换）
    setNavList: (state: NavState, navList: Array<RouteRecordRaw>) => {
        state.navList = navList
    }
}
//定义actions
export const actions = {
    getNavList({commit}: ActionContext<NavState, RootState>, router: any) {
        return new Promise((resolve, reject) => {
            getNavListApi().then(res => {
                let accessedRoutes;
                if (res.code == 200 && res.data) {
                    //动态生成路由
                    accessedRoutes = filterAsyncNavRoutes(res.data, router);
                    // 后端返回的是扁平导航列表，直接设置整个列表
                    commit('setNavList', accessedRoutes)
                }
                resolve(accessedRoutes);
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export function filterAsyncNavRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = [];
    routes.forEach((route: any) => {
        const tmp = {...route}
        const component = tmp.component;
        if (route.component) {
            if (component == 'Common') {
                tmp.component = Common;
            } else {
                tmp.component = modules[`../../common${component}.vue`]
            }
        }
        if (tmp.children) {
            //递归
            tmp.children = filterAsyncNavRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    console.log(res)
    return res;
}

//定义getters
export const getters = {
    getNavList: (state: NavState) => {
        console.log(state.navList)
        return state.navList
    }
}
export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}
