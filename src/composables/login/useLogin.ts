import {LoginParam} from "@/api/user/userModel";
import {useStore} from "@/store";
import {useRouter} from "vue-router";
import {loginOutApi} from "@/api/user/user";
import useInstance from "@/hooks/useInstance";
import {StatusCode} from "@/http/request";
import {cleanSession} from "@/utils/auth";

export default function useLogin(loginModel: LoginParam) {
    const router = useRouter();
    const store = useStore();
    const {global} = useInstance();

    // const {proxy} = getCurrentInstance() as any;
    //登录
    const login = async () => {
        try {
            await store.dispatch("login", loginModel)
            const token = store.getters.getToken
            if (token) {
                document.getElementById('sign')?.removeAttribute('class')
                document.querySelector('div.overlay')?.remove()
                document.body.classList.remove('fadeIn')
                global.$message({message: "登录成功", type: 'success'})
                const redirect = router.currentRoute.value.query.redirect as string;
                if (redirect) {
                    window.location.href = redirect;
                } else {
                    const roles: string[] = store.state.user.permissions || store.getters.getInfo?.roles || [];
                    if (roles.includes('admin')) {
                        window.location.href = '/admin/dashboard';
                    } else {
                        window.location.href = '/';
                    }
                }
            }
        } catch {
            global.$message({message: "登录失败", type: 'error'})
        }
        //表单验证
        // proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
        //     if (valid) {
        //         // await loginApi(loginModel).then(res=>{
        //         //
        //         // })
        //         store.dispatch("login", loginModel).then(res => {
        //             if(res.code===200){
        //                 global.$message({message: "退出成功", type: 'success'})
        //                 router.push({path:'/'})
        //             }
        //         })
        //     }
        // })
    }

    const loginOut = async () => {
        const confirm = await global.$myConfirm("确定退出登录吗？")
        if (confirm) {
            //执行删除操作
            let res = await loginOutApi(null)
            if (res && res.code == StatusCode.Success) {
                cleanSession();
                //信息提示
                global.$message({message: "退出登录", type: 'success'})
                store.commit("setToken",'')
                setTimeout('',3000)
                await router.push({path: '/'})
                location.reload()
            }
        }

    }
    return {
        login,
        loginOut
    }
}
