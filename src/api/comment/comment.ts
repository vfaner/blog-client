import http from "@/http/http"

enum Api {
    getTree = 'rgh/api/comment/tree',
    getList = 'rgh/api/comment/showList',
    delete = 'rgh/api/comment',
}

//获取树
export const getTreeApi = async (param: any) => {
    return await http.get(Api.getTree, param)
}
//获取评论列表
export const getListApi = async (param: any) => {
    return await http.get(Api.getList, param)
}
//删除评论
export const deleteCommentApi = async (param: any) => {
    return await http.delete(Api.delete, param)
}
