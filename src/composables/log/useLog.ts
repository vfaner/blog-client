
import {Result, StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import { deleteLogApi} from "@/api/log/log";

export default function useLog(getLogList) {

    const {global} = useInstance();

    //删除
    const deleteBtn = async (id: number|String) => {
        let data = {
            id: id
        }
        const confirm = await global.$myConfirm("确定删除该数据吗？")
        if (confirm) {
            //执行删除操作
            let res = await deleteLogApi(data);
            if (res && res.code == StatusCode.Success) {
                //信息提示
                global.$message({message: res.msg, type: 'success'})
                //刷新表格
                getLogList();
            }
        }
    }

    return {
        deleteBtn
    }
}
