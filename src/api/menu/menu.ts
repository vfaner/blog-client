import http from "@/http/http";

enum Api {
    getMenuList = 'rgh/api/menu/getMenu'
}

//获取菜单
export const getMenuListApi = async () => {
    return await http.get(Api.getMenuList)
}
