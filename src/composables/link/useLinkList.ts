import {onMounted, reactive} from "vue";

import {getLinkListApi} from "@/api/link/link";
import {AddLinkModel} from "@/api/link/linkModel";

export default function useLinkList() {
    //表格数据
    let linkList = reactive<{list: any[]}>({
        list: []
    })

    //获取数据
    const getLinkList = async () => {
        try {
            let res = await getLinkListApi(null)
            if (res) { linkList.list = res.data }
        } catch { /* 后端不可用 */ }
    }
    onMounted(() => {
        getLinkList()
    })

    return {
        linkList
    }
}
