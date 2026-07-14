//定义state
import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {getTagColorApi} from "@/api/tag/tag";
import {getConfigApi} from "@/api/system/system";
import {ConfigModel} from "@/api/system/SystemModel";
import {getSystemConfig, setSystemConfig} from "@/utils/auth";

export type SystemState = {
    system: ConfigModel
}
export const state: SystemState = {
    system: getSystemConfig() ? getSystemConfig() : {
        name: '',
        author: '',
        version: '',
        compatibility: '',
        title: '',
        keyword: '',
        description: '',
        logo: '',
        favicon: '',
        card: '',
        card1: '',
        card2: '',
        advisory: '',
        adv: []
    }
}
//定义mutations
export const mutations = {
    setSystem(state: SystemState, system: ConfigModel) {
        state.system = system
        setSystemConfig(system)
    },
}
//定义actions
export const actions = {
    getSystemConfig({commit}: ActionContext<SystemState, RootState>) {
        return new Promise((resolve, reject) => {
            getConfigApi().then(res => {
                let sys = res.data;
                if (res.code == 200) {
                    commit('setSystem', sys)
                }
                //返回
                resolve(sys);
            }).catch(error => {
                reject(error)
            })
        })
    }
}

//定义getters
export const getters = {
    getSysConfig(state: SystemState) {
        return state.system
    },
}
export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}
