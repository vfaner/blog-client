import {EditType} from "@/type/BaseEnum";
import {ref} from "vue"
import {AddMenuModel, MenuModel} from "@/api/nav/NavModel";
import {Result, StatusCode} from "@/http/request";
import {addMenuApi, deleteMenuApi, editMenuApi} from "@/api/nav/nav";
import useInstance from "@/hooks/useInstance";

export default function useMenu(getMenuTable) {
    const {global} = useInstance();
    //弹框的ref属性
    const addMenuRef = ref<{ show: (type: string, row?: MenuModel) => void }>();
    //新增
    const addBtn = () => {
        addMenuRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: MenuModel) => {
        addMenuRef.value?.show(EditType.EDIT, row)
    }

    //修改状态
    const changeStatus = (row: MenuModel) => {
        console.log("状态改变"+ row.enable)
    }
    //删除
    const deleteBtn = async (id: number) => {
        //信息确定
        let confirm = await global.$myconfirm('确定删除该数据吗?')
        if (confirm) {
            let res = await deleteMenuApi(id);
            if (res && res.code == 200) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getMenuTable();
            }
        }
    }
    //保存
    const save = async (param: AddMenuModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            res = await addMenuApi(param)
        } else {
            res = await editMenuApi(param)
        }
        if (res && res.code == StatusCode.Success) {
            //信息提示
            global.$message({message: res.msg, type: 'success'})
            //刷新表格
            getMenuTable()
        }
    }
    return {
        addBtn,
        editBtn,
        deleteBtn,
        changeStatus,
        save,
        addMenuRef
    }
}
