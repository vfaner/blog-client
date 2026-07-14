import {onMounted, reactive} from "vue";
import {RandomOrHotPram} from "@/api/article/ArticleModel";
import {getRandomShowApi} from "@/api/article/article";

export default function useRandomArticle() {
    //表格数据
    const articleRandom = reactive<{list: any[]}>({
        list: []
    })
    //数据展示参数
    const randomParam = reactive<RandomOrHotPram>({
        type: "1",
        limit: 4
    })
    //获取表格数据
    const getArticleRandomList = async () => {
        try {
            let res = await getRandomShowApi(randomParam)
            if (res) {
                articleRandom.list = res.data
            }
        } catch { /* 后端不可用 */ }
    }

    onMounted(() => {
        getArticleRandomList()
    })

    return {
        randomParam,
        articleRandom,
        getArticleRandomList

    }
}
