//定义state
import {ITabs} from "@/store/type";

export type TabsState = {
    tabsList: Array<ITabs>
}
export const state: TabsState = {
    tabsList: []
}
//定义mutations
export const mutations = {
    addTabs: (state: TabsState, tab: ITabs) => {
        //路径或标题已存在则不重复添加
        if (state.tabsList.some(item => item.path === tab.path || item.title === tab.title)) return;
        state.tabsList.push(tab);
    }
}
//定义action
export const action = {}
//定义getters
export const getters = {
    //获取tabs
    getTabs: (state: TabsState) => {
        return state.tabsList;
    }
}
export default {
    namespace: true,
    state,
    mutations,
    action,
    getters
}
