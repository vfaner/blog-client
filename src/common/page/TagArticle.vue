<template style="background-color: #f6f6f6">
  <div id="fee">
    <section class="container">
    <div class="pagetitle"><h1>关于 <strong style="color:red;" v-text="tagWithArticle.tagName"></strong> 的文章共有
      <strong v-text="tagWithArticle.articleVo.length" style="color: #e67e23"></strong> 条</h1></div><div class="content-wrap">
    <div class="content">

      <span v-for="articleVo in tagWithArticle.articleVo" :key="articleVo.article.id">
            <article class="excerpt excerpt-1 excerpt-sticky wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
            <a class="focus" href="javascript:;">
              <img :data-src="articleVo.article.cover!==null ? articleVo.article.cover : commonImage" @click="detail(articleVo.article.id)"
                   :alt="articleVo.article.title"
                   :src="articleVo.article.cover!==null ? articleVo.article.cover : commonImage" class="thumb" style="display: inline;">
            </a>
            <div class="excerpt-post">
              <header class="">
                <div class="btn btn-danger btn-xs m-zd">置顶</div>
                <a class="btn btn-primary btn-xs cat" href="javascript:;" >{{articleVo.categories[0].name}}<i></i>
                </a>
                <div class="post-entry-categories">

                    <a href="javascript:;" @click="searchTag(tag.id)" v-for="tag in articleVo.tags" :key="tag.id">{{ tag.name }}</a>

                </div>
                <h2>
                  <a href="javascript:;" @click="detail(articleVo.article.id)" :title="articleVo.article.title">{{articleVo.article.title}}</a>
                </h2>
              </header>
              <p class="note mb-0" v-text="tran(articleVo.article.content)"></p>
              <p class="meta">
                <span class="author">
                  <img :src="avatarImg" class="avatar avatar-50 photo" height="50" width="50" alt="作者头像" style="display: inline;">
                  <a href="javascript:;">{{ articleVo.article.author }}</a>
                </span>
                <span class="pv">
                  <i class="fa fa-eye"></i>阅读({{ articleVo.article.viewCount || 0 }})
                </span>
                <a class="pc" href="javascript:;" @click="detail(articleVo.article.id)">
                  <i class="fa fa-comments-o"></i>评论({{ articleVo.commentCount || 0 }})
                </a>
                <span class="time">
                  <i class="fa fa-clock-o"></i>{{ formatDate(articleVo.article.createdTime) }}
                </span>
              </p>
              <div class="zd" v-if="articleVo.article.top">
                <i class="fa fa-zhidin"></i>
              </div>
              <p class="like">
                <a class="ja_praise btn btn-primary" href="javascript:;" @click.stop="like(articleVo.article)" title="喜欢就赞一下吧！">
                  <i class="fa fa-thumbs-o-up"></i> 赞(<span>{{ articleVo.article.likeCount || 0 }}</span>)
                </a>
              </p>
            </div>
          </article>
          </span>
      <div class="pagination"><ul> <li class="active"><span>1</span></li> <li><a href="https://huayula.com/tag/QQxml%E5%8D%A1%E7%89%87/page/2">2</a></li>  <li><a href="https://huayula.com/tag/QQxml%E5%8D%A1%E7%89%87/page/3">3</a></li>  <li class="next-page"><a href="https://huayula.com/tag/QQxml%E5%8D%A1%E7%89%87/page/2">下一页</a></li>  <li><a href="https://huayula.com/tag/QQxml%E5%8D%A1%E7%89%87/page/6" title="尾页">尾页</a></li><li class="tj"><span>共 6 页</span></li></ul></div>
    </div>
  </div>
    <AsideUi />

  </section>
  </div>
<!--  <div>-->
<!--    <div style="margin-top: 15px">-->
<!--      <h1 style="font-size: 24px;color: #303133" v-text="'有关 '+tagWithArticle.tagName+' 的结果 '+tagWithArticle.article.length+' 条'"></h1></div>-->
<!--    <div style="margin-bottom: 15px"></div>-->
<!--    <div style="margin-bottom: 15px"></div>-->
<!--    <el-row :gutter="10">-->
<!--      <el-col :span="16">-->
<!--        <div v-for="article in tagWithArticle.article" :key="article.id">-->
<!--          <el-card @click="detail(article.id)" class="box-card" :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 12px;cursor:pointer;">-->
<!--            <div class="text item">-->
<!--              <el-row :gutter="8">-->
<!--                <el-col :span="3">-->
<!--                  <el-image :src="article.cover ? article.cover : commonImage" fit="contain" />-->
<!--                </el-col>-->
<!--                <el-col :span="21" style="padding-top: 8px">-->
<!--                  <div>-->
<!--                    <span style="color: #303133" v-text="article.title"></span>-->
<!--                  </div>-->
<!--                  <div>-->
<!--                    <p style="padding-right: 5px;padding-left: 5px;color: #8c939d;font-size: small" class="mb-0" v-text="tran(article.content)">-->
<!--                    </p>-->
<!--                  </div>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <Aside/>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </div>-->
</template>
<script setup lang="ts">
import avatarImg from "@/assets/avatar.jpg";
import useTagArticle from "@/composables/tag/useTagArticle";
import useCommon from "@/composables/common/useCommon";
import router from "@/router";
import {useRoute} from "vue-router";
import {onMounted, watch} from "vue";
import AsideUi from "@/common/aside/AsideUi.vue";
import useCategoryArticle from "@/composables/category/useCategoryArticle";
import { formatDate } from "@/utils/dateFormat";
import { likeArticleApi } from "@/api/article/article";
import { ElMessage } from "element-plus";
import { useStore } from "@/store";

const store = useStore();
const route = useRoute();
const tran=(str:string)=>{
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
}
const likedIds = new Set<number>()
const like = async (article: any) => {
  if (likedIds.has(article.id)) { ElMessage.warning('您已经点过赞了'); return }
  try {
    const res = await likeArticleApi(article.id)
    if (res && res.code === 200) {
      article.likeCount = res.data
      likedIds.add(article.id)
      ElMessage.success('点赞成功')
    }
  } catch { /* ignore */ }
}
const {tagWithArticle,getTagWithArticles,searchArticleByTag} = useTagArticle();
const {commonImage} = useCommon();

const detail = (id:string) => {
  router.push({name:'detail',query: {id:id}})
}
const searchTag = (id:string) => {
  searchArticleByTag(id)
}
onMounted(()=>{
    if(route.params.id){
        getTagWithArticles(String(route.params.id))
    }
})
watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
  if(newValue!==oldValue){
    let path = String(newValue)
   if(path.indexOf("tag/") != -1){
     getTagWithArticles(String(route.params.id))
   }
  }
},{ immediate: true })

// 标签名变化时动态设置页面标题
watch(() => tagWithArticle.tagName, (name) => {
  if (name) {
    const siteName = store.getters.getSysConfig?.title || '超级博客'
    document.title = `${name} - ${siteName}`
  }
}, { immediate: true })
</script>
<style src="@/assets/style/main.css" scoped></style>
<style src="@/assets/style/bootstrap.min.css" scoped></style>
<style scoped lang="scss">
.mb-0 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.btn, .btn-primary, .btn-xs ,.cat {
  background-color: #C38CFF;
}
.btn-primary, .search-input:focus, #bdcs .bdcs-search-form-input:focus, #submit, .plinks ul li a:hover, .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary {
  border-color: #C38CFF;
}
.btn-primary, .label-primary, .branding-primary, .post-copyright:hover, .article-tags a, .pagination ul > .active > a, .pagination ul > .active > span, .pagenav .current, .widget_ui_tags .items a:hover, .sign .close-link, .pagemenu li.active a, .pageheader, .resetpasssteps li.active, #navs h2, #navs nav, .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary, .tag-clouds a:hover {
  background-color: #C38CFF;
}
</style>
