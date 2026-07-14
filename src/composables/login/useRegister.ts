import {RegUserModel} from "@/api/user/userModel";
import {addUserApi} from "@/api/user/user";
import useInstance from "@/hooks/useInstance";
import {StatusCode} from "@/http/request";
import {reactive} from "vue";

export default function useRegister() {
    const {global} = useInstance();

    const regForm = reactive<RegUserModel>({
        loginName:'',
        username: '',
        password: '',
        email: '',
        code: '',
        isEnabled: true
    })
    // const {proxy} = getCurrentInstance() as any;
    //登录
    const register = async () => {
        let res = await addUserApi(regForm)
        if (res && res.code == StatusCode.Success) {
            global.$message({message: "注册成功", type: 'success'})
            document.getElementById('sign')?.removeAttribute('class')
            document.querySelector('div.overlay')?.remove()
            document.body.classList.remove('fadeIn')
        }
    }


    return {
        regForm,
        register
    }
}
