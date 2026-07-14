/**
 * vscode可以使用这个，需要在下面的index引入，主要就是做语法提示，webstrom本身自带提示，可以不用直接忽略掉即可
 */
import {CommitOptions, DispatchOptions, Store as VuexStore} from 'vuex'
import {modules, RootState} from './index'
//获取modules的类型
type Modules = typeof modules
//获取所有模块下的mutations
type GetMutation<T> = T extends { mutations: infer G } ? G : never;
type GetMutations<T> = {
    [K in keyof T]: GetMutation<T[K]>
}
type mutationsObj = GetMutations<Modules>
//获取所有模块下的actions
type GetAction<T> = T extends { actions: infer G } ? G : never;
type GetActions<T> = {
    [K in keyof T]: GetAction<T[K]>
}
type actionsObj = GetActions<Modules>
//获取所有模块下的getters
type GetGetter<T> = T extends { getters: infer G } ? G : never;
type GetGetters<T> = {
    [K in keyof T]: GetGetter<T[K]>
}
type gettersObj = GetGetters<Modules>

//tabs/addTabs menu/setCount
type AddPrefix<prefix, keys> = `${prefix & string}/${keys & string}`
type GetKey<T, K> = AddPrefix<K, keyof T>;
type GetKeys<T> = {
    [K in keyof T]: GetKey<T[K], K>
}[keyof T]

type ss = GetKeys<mutationsObj>

//获取当前模块下每个函数的返回值
type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GetMethod<T> = {
    [K in GetKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown
}
type GetMutationsFunc = GetMethod<mutationsObj>
type GetActionsFunc = GetMethod<actionsObj>
type GetGettersFunc = GetMethod<gettersObj>

//
export type CommonStore = Omit<VuexStore<RootState>, 'commit' | 'getters' | 'dispatch'>
    &
    {
        commit<K extends keyof GetMutationsFunc, P extends Parameters<GetMutationsFunc[K]>[1]>(
            key: K,
            payload?: P,
            options?: CommitOptions
        ): ReturnType<GetMutationsFunc[K]>
    }
    &
    {
        getters: {
            [K in keyof GetGettersFunc]: ReturnType<GetGettersFunc[K]>
        }
    }
    &
    {
        dispatch<K extends keyof GetActionsFunc>(
            key: K,
            payload?: Parameters<GetActionsFunc[K]>[1],
            options?: DispatchOptions
        ): ReturnType<GetActionsFunc[K]>
    }
