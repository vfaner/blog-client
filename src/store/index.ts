import {InjectionKey} from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import tabs, {TabsState} from "@/store/modules/tabs";
import menu, {MenuState} from "@/store/modules/menu";
import user, {UserState} from "@/store/modules/user";
import nav, {NavState} from "@/store/modules/nav";
import tags, {TagState} from "@/store/modules/tags";
import system, {SystemState} from "@/store/modules/system";



//接口就是一种规范
export type RootState = {
    tabs: TabsState,
    menu: MenuState,
    nav: NavState,
    user: UserState,
    tags: TagState,
    system: SystemState,
}
//导入所有模块
export const modules = {
    tabs: tabs,
    menu: menu,
    nav: nav,
    user: user,
    tags: tags,
    system: system
}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules
//     state: {
//         count: 0,
//         collapse: false,
//         tabsList: []
//     },
//     mutations: {
//         setCount(state: State, count: number) {
//             state.count = count
//         },
//         //设置collapse
//         setCollapse(state: State, collapse: boolean) {
//             state.collapse = collapse
//         },
//         addTabs: (state: State, tab: ITabs) => {
//             //判断是否已经存在，如果不存在，才放入
//             if (state.tabsList.some(item => item.path === tab.path)) return;
//             state.tabsList.push(tab);
//         }
//     },
//     getters: {
//         getCount(state: State) {
//             return state.count
//         },
//         //获取collapse
//         getCollapse(state: State) {
//             return state.collapse
//         },
//         //获取tabs
//         getTabs: (state: State) => {
//             return state.tabsList;
//         }
//     }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}
