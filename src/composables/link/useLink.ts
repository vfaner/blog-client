import {EditType} from '@/type/BaseEnum'
import {ref} from 'vue'
import {Result, StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import {AddLinkModel} from "@/api/link/linkModel";
import {addLinkApi, deleteLinkApi, editLinkApi} from "@/api/link/link";



export default function useLink(getLinkList) {

    const {global} = useInstance();
    // 弹框组件ref属性
    const addLinkRef = ref<{ show: (type: string, row?: AddLinkModel) => void }>()
    //新增
    const addBtn = () => {
        addLinkRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: AddLinkModel) => {
        addLinkRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number|string) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteLinkApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getLinkList();
            }
        }
    }
    //保存
    const save = async (param: AddLinkModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            let result = {
                name: param.name,
                link: param.link,
                description: param.description,
                enable: param.enable
            } as AddLinkModel;
            res = await addLinkApi(result)
        } else {
            res = await editLinkApi(param)
        }
        console.log(res.code)
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getLinkList();
        }
    }

    //编辑
    const changeStatus = async (row: AddLinkModel) => {
        let res: Result;
        console.log(row.enable)
        console.log(row)
        res = await editLinkApi(row)
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getLinkList();
        }
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addLinkRef,
        changeStatus
    }
}
