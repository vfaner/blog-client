import {onMounted, reactive} from "vue";
import _ from "lodash";
import {getArticleCateLimitApi, getListShowApi} from "@/api/article/article";
import {CardParam} from "@/api/article/ArticleModel";

export default function useArticleIndexShow() {
    //表格数据
    const articleShow = reactive<{list: any[], pageNum: number, pageSize: number, total: number, today: number}>({
        list: [],
        pageNum: 0,
        pageSize: 0,
        total: 0,
        today: 0,
    })
    //表格查询参数
    const listParam = reactive({
        pageNum: 0,
        pageSize: 10
    })

    //迷你卡片数据
    const articleCard = reactive({
        list: [],
        id: 0,
        name: ''
    })
    //迷你卡片查询参数
    const cardParam = reactive<CardParam>({
        cateId: 1,
        limit: 6
    })
    //获取表格数据
    const getArticleIndexList = async () => {
        try {
            const params = _.pickBy({...listParam})
            let res = await getListShowApi(params)
            if (res) {
                articleShow.list = res.data.articleList || []
                articleShow.total = res.data.total || 0
                articleShow.today = res.data.todayUpdate || 0
            }
        } catch {
            // 后端不可用，静默处理
        }
    }
    const getArticleIndexCard = async (cateId: number | string, limit?: number) => {
        try {
            cardParam.cateId = cateId
            cardParam.limit = limit === null || limit === 0 ? 6 : limit
            let res = await getArticleCateLimitApi(cardParam)
            if (res) {
                articleCard.list = res.data.articles
                articleCard.id = res.data.id
                articleCard.name = res.data.name
            }
        } catch {
            // 后端不可用
        }
        return articleCard
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
        getArticleIndexList()
    })

    return {
        articleCard,
        getArticleIndexCard,
        listParam,
        articleShow,
        getArticleIndexList,
        sizeChange,
        currentChange
    }
}
