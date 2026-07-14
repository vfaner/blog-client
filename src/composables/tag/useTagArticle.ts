import {reactive} from "vue";
// import {useRoute} from "vue-router";
import {getTagWithArticlesApi} from "@/api/tag/tag";
import {TagWithArticle} from "@/api/tag/TagModel";
import router from "@/router";

export default function useTagArticle(){

    // const route = useRoute();

    const tagWithArticle = reactive<TagWithArticle>({
        tagId:'',
        tagName:'',
        articleVo:[]
    })

    const getTagWithArticles = async (id: string) =>  {
        let res = await getTagWithArticlesApi(id)
        if (res) {
            tagWithArticle.articleVo = res.data.articles
            tagWithArticle.tagId = res.data.id;
            tagWithArticle.tagName = res.data.tag.name
        }
    }
    //获取文章下所有
    const searchArticleByTag = async (name: string) => {
        await router.push({name: 'tag_article', params: {id: name}})

    }

    // onMounted(()=>{
    //     if(route.params.id){
    //         getTagWithArticles(String(route.params.id))
    //     }
    // })
    return{
        tagWithArticle,
        getTagWithArticles,
        searchArticleByTag
    }
}
