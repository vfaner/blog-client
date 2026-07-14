import {onMounted, reactive} from "vue";
import {getArticlePageApi} from "@/api/article/Article";
import {ArticleSearchParam} from "@/api/article/ArticleModel";
import _ from "lodash";

export default function useArticleTable() {
    //表格数据
    const articleTable = reactive({
        list: [],
        pageNum:0,
        pageSize:0,
        total:0,
    })
    //表格查询参数
    const listParam = reactive<ArticleSearchParam>({
        title: '',
        author: '',
        pageNum: 1,
        pageSize: 10
    })
    //获取表格数据
    const getArticleList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getArticlePageApi(params)
        if (res) {
            articleTable.list = res.data.records || res.data.content || []
            articleTable.total = res.data.total || res.data.totalElements || 0
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getArticleList();
    }
    //重置按钮
    const resetBtn = () => {
        listParam.title = '';

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
        getArticleList()
    })

    return {
        listParam,
        articleTable,
        getArticleList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
