import {EditType} from '@/type/BaseEnum'
import {ref} from 'vue'
import {AddRoleModel} from "@/api/role/RoleModel";
import {Result, StatusCode} from "@/http/request";
import {addRoleApi, deleteRoleApi, editRoleApi} from "@/api/role/role";
import useInstance from "@/hooks/useInstance";

export default function useRole(getRoleList) {

    // 分配权限弹窗组件ref属性
    const assignMenuRef = ref<{ show: (roleId: string, name: string) => void }>()
    const {global} = useInstance();
    // 弹框组件ref属性
    const addRoleRef = ref<{ show: (type: string, row?: AddRoleModel) => void }>()
    //新增
    const addBtn = () => {
        addRoleRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: AddRoleModel) => {
        addRoleRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteRoleApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getRoleList();
            }
        }
    }
    //保存
    const save = async (param: AddRoleModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            let result = {
                name: param.name,
                code: param.code,
                description: param.description
            } as AddRoleModel;
            res = await addRoleApi(result)
        } else {
            res = await editRoleApi(param)
        }
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getRoleList()
        }
    }
    //分配权限
    const assignPermission = (roleId: string, name: string) => {
        assignMenuRef.value?.show(roleId, name)
    }
    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        assignPermission,
        addRoleRef,
        assignMenuRef
    }
}
