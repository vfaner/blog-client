import {EditType} from '@/type/BaseEnum'
import {ref} from 'vue'
import {Result, StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import {AddCategoryModel} from "@/api/category/CategoryModel";
import {addCategoryApi, deleteCategoryApi, editCategoryApi} from "@/api/category/category";

export default function useCategory(getCategoryList) {

    const {global} = useInstance();
    // 弹框组件ref属性
    const addCategoryRef = ref<{ show: (type: string, row?: AddCategoryModel) => void }>()
    //新增
    const addBtn = () => {
        addCategoryRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: AddCategoryModel) => {
        addCategoryRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number|String) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteCategoryApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getCategoryList();
            }
        }
    }
    //保存
    const save = async (param: AddCategoryModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            res = await addCategoryApi(param)
        } else {
            res = await editCategoryApi(param)
        }
        console.log(res.code)
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            //加载列表
            getCategoryList();
        }
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addCategoryRef,

    }
}
