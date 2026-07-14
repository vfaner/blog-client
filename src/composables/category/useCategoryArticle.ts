import {onMounted, reactive, computed} from "vue";
import {CateWithArticle} from "@/api/category/CategoryModel";
import {getCategoryWithArticlesApi} from "@/api/category/category";
import {useRoute} from "vue-router";

export default function useCategoryArticle() {
    const route = useRoute();

    // 全量文章 + 分类信息
    const cateWithArticle = reactive<CateWithArticle>({
        cateId: '',
        cateName: '',
        articleVo: []
    })

    // 全部文章（用于前端分页切片）
    const allArticles = reactive<{ list: any[] }>({ list: [] })

    // 分页状态
    const pagination = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0,
    })

    // 当前页数据（前端切片）
    const applyPage = () => {
        const start = (pagination.pageNum - 1) * pagination.pageSize
        cateWithArticle.articleVo = allArticles.list.slice(start, start + pagination.pageSize)
        pagination.total = allArticles.list.length
    }

    const getCateWithArticles = async (id: string | number) => {
        // 只传 id，后端 /article/category/{id} 返回该分类下全部文章
        let res = await getCategoryWithArticlesApi(id)
        if (res && res.data) {
            allArticles.list = res.data.articles || []
            cateWithArticle.cateId = res.data.id ?? id
            cateWithArticle.cateName = res.data.cate ? res.data.cate.name : res.data.name
            pagination.pageNum = 1
            applyPage()
        }
    }

    const sizeChange = (size: number) => {
        pagination.pageSize = size
        pagination.pageNum = 1
        applyPage()
    }

    const currentChange = (page: number) => {
        pagination.pageNum = page
        applyPage()
    }

    onMounted(() => {
        if (route.params.id) {
            getCateWithArticles(String(route.params.id))
        }
    })

    return { cateWithArticle, pagination, getCateWithArticles, sizeChange, currentChange }
}
