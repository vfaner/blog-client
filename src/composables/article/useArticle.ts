import {EditType} from '@/type/BaseEnum'
import {reactive, ref} from 'vue'
import {Result, StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import {AddArticleModel} from "@/api/article/ArticleModel";
import {addArticleApi, deleteArticleApi, editArticleApi} from "@/api/article/Article";
import router from "@/router";
import _ from "lodash";

export default function useArticle(getArticleList) {

    const {global} = useInstance();
    //新增
    const rules = reactive({
        title: [{
            trigger: 'change',
            required: true,
            message: '请输入文章名称'
        }],
        content: [{
            trigger: 'change',
            required: true,
            message: '请输入文章内容'
        }]
    })
    //编辑
    const editBtn = (row: number|string) => {
        console.log("id="+row)
        router.push({path: '/admin/article-edit', query: {id: row}})
            .then()
        // addArticleRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (id: number|String) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteArticleApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getArticleList();
            }
        }
    }
    //保存
    const save = async (param: AddArticleModel) => {
        let res: Result;
        if (param.type == EditType.ADD) {
            res = await addArticleApi(param);
        } else {
            res = await editArticleApi(param)
        }
        if (res && res.code == StatusCode.Success) {
            //成功提示
            global.$message({message: res.msg, type: 'success'})
            await router.push('/admin/articles')
        }
    }

    return {
        rules,
        editBtn,
        deleteBtn,
        save,

    }
}
