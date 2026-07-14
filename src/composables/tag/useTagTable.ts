import {onMounted, reactive} from "vue";
import {getTagPageApi} from "@/api/tag/Tag";
import {TagSearchParam} from "@/api/tag/TagModel";
import _ from "lodash";

export default function useTagTable() {
    //表格数据
    const tagTable = reactive({
        list: [],
        total:0,
    })


    //表格查询参数
    const listParam = reactive<TagSearchParam>({
        name: '',
        alias: '',
        pageNum: 1,
        pageSize: 10
    })
    //获取表格数据
    const getTagList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getTagPageApi(params)
        if (res) {
            tagTable.list = res.data.records || res.data.content || []
            tagTable.total = res.data.total || res.data.totalElements || 0;
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getTagList();
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
        getTagList()
    })

    return {
        listParam,
        tagTable,
        getTagList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
