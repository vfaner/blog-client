import http from "@/http/http"

enum Api {
    getPage = 'rgh/api/log/page-query',
    delete = 'rgh/api/log'
}

//分类分页
export const getLogPageApi = async (param: any) => {
    return await http.get(Api.getPage, param)
}
//删除分类
export const deleteLogApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}
