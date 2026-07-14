import {onMounted, reactive} from "vue";
import {getLogPageApi} from "@/api/log/log";
import _ from "lodash";

export default function useLogTable() {
    //表格数据
    const logTable = reactive({
        list: [],
        total:0,
    })


    //表格查询参数
    const listParam = reactive<any>({
        type: '',
        operatorName: '',
        pageNum: 1,
        pageSize: 10
    })
    //获取表格数据
    const getLogList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getLogPageApi(params)
        if (res) {
            logTable.list = res.data.records || res.data.content || []
            logTable.total = res.data.total || res.data.totalElements || 0;
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getLogList();
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
        getLogList()
    })

    return {
        listParam,
        logTable,
        getLogList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
