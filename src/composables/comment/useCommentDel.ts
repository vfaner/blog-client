import useInstance from "@/hooks/useInstance";
import {StatusCode} from "@/http/request";
import {deleteCommentApi} from "@/api/comment/comment";

export default function useCommentDel(getCommentList) {
    const {global} = useInstance();
// 删除评论
    const remove = async (id: number) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteCommentApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getCommentList();
            }
        }

    }

    return{
        remove
    }
}
