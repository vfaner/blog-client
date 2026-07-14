import {onMounted, reactive} from "vue";

import _ from "lodash";
import {LinkSearchParam} from "@/api/link/linkModel";
import {getLinkPageApi} from "@/api/link/link";

export default function useLinkTable() {
    //表格数据
    const linkTable = reactive({
        list: [],
        total:0,
    })


    //表格查询参数
    const listParam = reactive<LinkSearchParam>({
        name: '',
        pageNum: 1,
        pageSize: 10
    })
    //获取表格数据
    const getLinkList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getLinkPageApi(params)
        if (res) {
            linkTable.list = res.data.records || res.data.content || []
            linkTable.total = res.data.total || res.data.totalElements || 0;
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getLinkList();
    }
    //重置按钮
    const resetBtn = () => {
        listParam.name = '';

    }
    //页容量改变触发
    const sizeChange = (size: number) => {
        listParam.pageSize = size;

    }
    //页数改变触发
    const currentChange = (page: number) => {
        listParam.pageNum = page;

    }
    onMounted(() => {
        // getRoleList()
        getLinkList()
    })

    return {
        listParam,
        linkTable,
        getLinkList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
