import {reactive, ref} from "vue";
import {LoginParam} from "@/api/user/userModel";
import {ElForm} from "element-plus";

export default function useBaseLogin() {
    //表单的ref属性
    const loginFormRef = ref<InstanceType<typeof ElForm>>();
    //表单绑定的数据
    const loginModel = reactive<LoginParam>({
        username: 'admin',
        password: '123456',
        code: '11112'
    })
    //表单验证规则
    const rules = reactive({
        username: [{
            required: true,
            trigger: 'change',
            message: '请输入账号'
        }],
        password: [{
            required: true,
            trigger: 'change',
            message: '密码'
        }],
        code: [{
            required: true,
            trigger: 'change',
            message: '验证码'
        }]
    })
    return {
        loginModel,
        rules,
        loginFormRef
    }
}
