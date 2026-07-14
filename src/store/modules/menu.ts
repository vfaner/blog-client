//定义state
import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {getMenuListApi} from "@/api/menu/menu";
import {RouteRecordRaw} from "vue-router";
import Layout from '@/layout/Index.vue';

const modules = import.meta.glob('../../views/**/*.vue')
export type MenuState = {
    count: number,
    collapse: boolean,
    menuList: any
}
export const state: MenuState = {
    count: 0,
    collapse: false,
    menuList: [
        {
            path: '/admin',
            component: "Layout",
            meta: {
                title: "仪表盘",
                icon: "HomeFilled",
                roles: ["sys:manage"]
            },
            children: []
        }
    ]
}
//定义mutations
export const mutations = {
    setCount(state: MenuState, count: number) {
        state.count = count
    },
    //设置collapse
    setCollapse(state: MenuState, collapse: boolean) {
        state.collapse = collapse
    },
    //设置menuList
    setMenuList: (state: MenuState, menuList: Array<RouteRecordRaw>) => {
        state.menuList = state.menuList.concat(menuList)
    }
}
//定义actions
export const actions = {
    getMenuList({commit}: ActionContext<MenuState, RootState>, router: any) {
        return new Promise((resolve, reject) => {
            getMenuListApi().then(res => {
                console.log('菜单数据')
                console.log(res)
                let accessedRoutes;
                if (res.code == 200) {
                    //动态生成路由
                    accessedRoutes = filterAsyncRoutes(res.data, router);
                    //设置到menuList
                    console.log('后台菜单数据', accessedRoutes.filter(item => item != null && item.path))
                    commit('setMenuList', accessedRoutes.filter(item => item != null && item.path))
                }
                //返回
                resolve(accessedRoutes);
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = [];
    routes.forEach((route: any) => {
        const tmp = {...route}
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../../views${component}.vue`]
            }
        }
        if (tmp.children) {
            //递归
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res;
}

//定义getters
export const getters = {
    getCount(state: MenuState) {
        return state.count
    },
    //获取collapse
    getCollapse(state: MenuState) {
        return state.collapse
    },
    getMenuList: (state: MenuState) => {
        console.log(state.menuList)
        return state.menuList
    }
}
export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}
