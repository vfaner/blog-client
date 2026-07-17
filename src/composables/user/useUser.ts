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
        const payload: any = {
            username: param.username,
            nickName: param.nickName,
            avatar: param.avatar,
            email: param.email,
            roleIds: param.roleIds || [],
        }
        // 密码：新增必填；编辑留空则不改
        if (param.password) payload.password = param.password
        if (param.type == EditType.ADD) {
            res = await addUserApi(payload)
        } else {
            payload.id = param.id
            res = await editUserApi(payload)
        }
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getUserList();
        } else if (res) {
            global.$message({message: res.msg, type: 'error'})
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
