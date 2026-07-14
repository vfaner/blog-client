import {EditType} from '@/type/BaseEnum'
import {ref} from 'vue'
import {Result, StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import {AddTagModel} from "@/api/tag/TagModel";
import {addTagApi, deleteTagApi, editTagApi} from "@/api/tag/Tag";


export default function useTag(getTagList) {

    const {global} = useInstance();
    // 弹框组件ref属性
    const addTagRef = ref<{ show: (type: string, row?: AddTagModel) => void }>()
    //新增
    const addBtn = () => {
        addTagRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: AddTagModel) => {
        addTagRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number|string) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteTagApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getTagList();
            }
        }
    }
    //保存
    const save = async (param: AddTagModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            let result = {
                name: param.name,
                alias: param.alias,
                description: param.description
            } as AddTagModel;
            res = await addTagApi(result)
        } else {
            res = await editTagApi(param)
        }
        console.log(res.code)
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getTagList();
        }
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addTagRef,

    }
}
