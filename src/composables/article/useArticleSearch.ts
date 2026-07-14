import {onMounted, reactive, watch} from "vue";
import {getArticlePageApi} from "@/api/article/article";
import {useRoute} from "vue-router";

export default function useArticleSearch() {
    const route = useRoute();

    // 搜索关键词
    const key = reactive({data: ''})

    // 文章列表 + 分页
    const articleList = reactive<{list: any[], pageNum: number, pageSize: number, total: number}>({
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
    })

    // 搜索参数
    const searchParam = reactive({
        title: '',
        pageNum: 1,
        pageSize: 10,
    })

    const getArticleList = async (keyword?: string) => {
        if (keyword !== undefined) {
            searchParam.title = keyword
            searchParam.pageNum = 1
        }
        let res = await getArticlePageApi(searchParam)
        if (res && res.code === 200) {
            articleList.list = res.data.content
            articleList.total = res.data.total || 0
            articleList.pageNum = searchParam.pageNum
            articleList.pageSize = searchParam.pageSize
        }
    }

    const sizeChange = (size: number) => {
        searchParam.pageSize = size
        searchParam.pageNum = 1
        getArticleList()
    }

    const currentChange = (page: number) => {
        searchParam.pageNum = page
        getArticleList()
    }

    watch(() => route.query.keyword, (newVal) => {
        if (newVal) {
            key.data = String(newVal)
            getArticleList(String(newVal))
        }
    })

    onMounted(() => {
        if (route.query.keyword) {
            key.data = String(route.query.keyword)
            getArticleList(String(route.query.keyword))
        }
    })

    return { key, articleList, searchParam, getArticleList, sizeChange, currentChange }
}
