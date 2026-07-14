import {EditType} from '@/type/BaseEnum'
import {reactive, ref} from 'vue'
import {Result, StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import {AddUserModel, EditUserModel, UserSearchParam} from "@/api/user/userModel";
import {addUserApi, deleteUserApi, editUserApi} from "@/api/user/user";

export default function useUser(getUserList) {

    const {global} = useInstance();

    // 弹框组件ref属性
    const addUserRef = ref<{ show: (type: string, row?: AddUserModel) => void }>()
    //新增
    const addBtn = () => {
        addUserRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: AddUserModel) => {
        addUserRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number|String) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteUserApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getUserList();
            }
        }
    }
    //保存
    const save = async (param: AddUserModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            let result = {
                username: param.username,
                loginName: param.loginName,
                password: param.password,
                isAccountNonExpired: param.isAccountNonExpired,
                isAccountNonLocked: param.isAccountNonLocked,
                isCredentialsNonExpired: param.isCredentialsNonExpired,
                isEnabled: param.isEnabled,
            } as AddUserModel;
            res = await addUserApi(result)
        } else {
            console.log("编辑"+param)
            let result = {
                id: param.id,
                username: param.username,
                loginName: param.loginName,
                isAccountNonExpired: param.isAccountNonExpired,
                isAccountNonLocked: param.isAccountNonLocked,
                isCredentialsNonExpired: param.isCredentialsNonExpired,
                isEnabled: param.isEnabled,
            } as AddUserModel;
            res = await editUserApi(result)
        }
        console.log(res.code)
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getUserList();
        }
    }

    //更新资料
    const modifyUser = async (user: EditUserModel) => {
        let res = await editUserApi(user);
        if (res && res.code == StatusCode.Success) {
            //信息提示
            global.$message({message: res.msg, type: 'success'})
            location.reload()
        } else {
            global.$message({message: res.msg, type: 'error'})
        }
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addUserRef,
        modifyUser
    }
}
