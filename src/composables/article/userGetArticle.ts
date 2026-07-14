import {onMounted, reactive, watch} from "vue";
import {getOneApi} from "@/api/article/article";
import {LocationQueryValue, useRoute} from "vue-router";
import {getCategoryListApi} from "@/api/category/category";
import {getTagListApi} from "@/api/tag/tag";

export default function useGetArticle() {
    const route = useRoute();
    //数据
    const articleData = reactive<any>({
        id: '',
        title: '',
        author: '',
        cover: '',
        content: '',
        categories: [],
        tags: [],
        state: 0,
        downloadEnable: false,
        downloadName: '',
        downloadUrl: '',
        downloadSize: '',
        downloadDesc: '',
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        created_time: '',
        modified_time: '',
        type: '0' //区分新增编辑
    })
    const cateList = reactive<{list: any[]}>({
        list: []
    })
    const tagList = reactive<{list: any[]}>({
        list: []
    })
    //获取所有分类
    const getCateList = async () => {
        const params = null
        let res = await getCategoryListApi(params)
        if (res) {
            cateList.list = res.data
        }
    }
    //获取所有分类
    const getTagList = async () => {
        const params = null
        let res = await getTagListApi(params)
        if (res) {
            tagList.list = res.data
        }
    }

    //获取表格数据
    const getArticle = async (id: string | LocationQueryValue[]) => {
        let res = await getOneApi(id)
        if (res) {
            articleData.id = res.data.article.id
            articleData.title = res.data.article.title
            articleData.author = res.data.article.author
            articleData.cover = res.data.article.cover
            articleData.categories = res.data.categories
            articleData.tags = res.data.tags
            articleData.content = res.data.article.content
            articleData.state = res.data.article.state
            articleData.downloadEnable = res.data.article.downloadEnable
            articleData.downloadName = res.data.article.downloadName
            articleData.downloadUrl = res.data.article.downloadUrl
            articleData.downloadSize = res.data.article.downloadSize
            articleData.downloadDesc = res.data.article.downloadDesc
            articleData.viewCount = res.data.article.viewCount || 0
            articleData.likeCount = res.data.article.likeCount || 0
            articleData.commentCount = res.data.commentCount || 0
            articleData.created_time = res.data.article.createdTime
            articleData.modified_time = res.data.article.modifiedTime
            articleData.type = "1"
        }
    }
    onMounted(() => {
        getCateList()
        getTagList()
        if(route.query.id){
            articleData.type="1"
            getArticle(route.query.id)
        }else {
            articleData.type="0"
        }
    })

    // 监听路由 id 变化，重新加载文章（滚动到顶部）
    watch(() => route.query.id, (newId) => {
        if (newId) {
            articleData.type = "1"
            getArticle(newId)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    })

    return {
        tagList,
        getTagList,
        cateList,
        getCateList,
        articleData,
        getArticle,
    }
}
