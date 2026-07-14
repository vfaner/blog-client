//定义state
import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {getTagColorApi} from "@/api/tag/tag";

export type TagState = {
    tags: any
}
export const state: TagState = {
    tags: []
}
//定义mutations
export const mutations = {
    setTags(state: TagState, tags: []) {
        state.tags = tags
    },
}
//定义actions
export const actions = {
    getTags({commit}: ActionContext<TagState, RootState>) {
        return new Promise((resolve, reject) => {
            getTagColorApi("").then(res => {
                let tag = res.data;
                if (res.code == 200) {
                    commit('setTags', tag)
                }
                //返回
                resolve(tag);
            }).catch(error => {
                reject(error)
            })
        })
    }
}

//定义getters
export const getters = {
    getTags(state: TagState) {
        return state.tags
    },
}
export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}
