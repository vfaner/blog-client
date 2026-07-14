import {onMounted, reactive} from "vue";
import {getCategoryPageApi} from "@/api/category/category";
import {CategorySearchParam} from "@/api/category/CategoryModel";
import _ from "lodash";

export default function useCategoryTable() {
    //表格数据
    const cateTable = reactive({
        list: [],
        total:0,
    })

    //表格查询参数
    const listParam = reactive<CategorySearchParam>({
        name: '',
        alias: '',
        pageNum: 1,
        pageSize: 10
    })
    //获取表格数据
    const getCategoryList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getCategoryPageApi(params)
        if (res) {
            cateTable.list = res.data.records || res.data.content || []
            cateTable.total = res.data.total || res.data.totalElements || 0;
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getCategoryList();
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
        getCategoryList()
    })

    return {
        listParam,
        cateTable,
        getCategoryList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
