import {DialogModel} from "@/type/BaseType";
import {EditType, Title} from "@/type/BaseEnum";
import {reactive, ref, onMounted} from "vue";
import {ElForm} from "element-plus";
import useInstance from "@/hooks/useInstance";
import {AddUserModel} from "@/api/user/userModel";
import {getRoleListApi} from "@/api/role/role";

export default function useAddUser(dialog: DialogModel, onClose, onShow, emit) {
    //获取全局属性
    const {global} = useInstance();
    //ref的属性
    const addUserForm = ref<InstanceType<typeof ElForm>>()
    //表单绑定的数据
    const addModel = reactive<AddUserModel>({
        id: '',
        username: '',
        nickName: '',
        avatar: '',
        email: '',
        password: '',
        roleIds: [],
        isEnabled: true,
        isAccountNonLocked: true,
        type: ''
    })
    //可选角色列表（从后端加载）
    const roleOptions = ref<Array<{ id: number; name: string; code: string }>>([])
    const loadRoles = async () => {
        try {
            const res = await getRoleListApi()
            if (res && res.code === 200 && Array.isArray(res.data)) {
                roleOptions.value = res.data
            }
        } catch { /* 静默 */ }
    }
    onMounted(loadRoles)

    //表单验证规则
    const rules = reactive({
        username: [{
            trigger: 'change',
            required: true,
            message: '请输入账户名'
        }],
        nickName: [{
            trigger: 'change',
            required: true,
            message: '请输入昵称'
        }],
        email: [{
            trigger: 'change',
            type: 'email',
            message: '邮箱格式不正确'
        }]
    })
    //确定
    const confirm = () => {
        addUserForm.value?.validate(isValid => {
            if (isValid) {
                emit('save', addModel)
                //关闭弹窗
                onClose();
            }
        })
    }
    //显示弹框
    const show = (type: string, row: AddUserModel) => {
        dialog.width = 720;
        dialog.height = 0; // 0 = 自适应内容
        //设置弹框标题
        dialog.title = type == EditType.ADD ? Title.ADD : Title.EDIT
        //清空表单
        global.$resetForm(addUserForm.value, addModel)
        // 重置为默认值
        Object.assign(addModel, {
            id: '', username: '', nickName: '', avatar: '', email: '',
            password: '', roleIds: [], isEnabled: true, isAccountNonLocked: true
        })
        //显示弹框
        onShow();
        //判断是否编辑，复制当前行到表单数据
        if (type == EditType.EDIT && row) {
            addModel.id = row.id
            addModel.username = row.username || ''
            addModel.nickName = (row as any).nickName || ''
            addModel.avatar = (row as any).avatar || ''
            addModel.email = (row as any).email || ''
            addModel.password = ''
            // roleIds 需要根据 role code 反查角色 id
            const codes: string[] = (row as any).roles || []
            addModel.roleIds = roleOptions.value
                .filter(r => codes.includes(r.code))
                .map(r => r.id)
        }
        //设置编辑属性
        addModel.type = type;
    }
    return {
        confirm,
        show,
        addModel,
        rules,
        addUserForm,
        roleOptions
    }
}
