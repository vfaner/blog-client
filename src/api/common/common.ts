import http from "@/http/http"
import axios from "axios";

enum Api {
    yiYan = 'https://api.uixsj.cn/hitokoto/get',

}

//一言
export const getYiYanApi = async () => {
   return await axios.get(Api.yiYan).then(res=>res.data)
}
