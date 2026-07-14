<template>
  <div id="fee">
    <section class="container">
      <div class="catleader">
        <h1 v-text="cateWithArticle.cateName"></h1>
        <div class="catleader-desc"></div>
      </div>
      <div class="content-wrap">
        <div class="content">
          <span v-for="articleVo in cateWithArticle.articleVo" :key="articleVo.article.id">
            <article class="excerpt excerpt-1 excerpt-sticky wow zoomIn animated"
                     style="visibility: visible; animation-name: zoomIn;"
            >
            <a class="focus" href="javascript:;">
              <img :data-src="articleVo.article.cover!==null ? articleVo.article.cover : commonImage" @click="detail(articleVo.article.id)"
                   :alt="articleVo.article.title"
                   :src="articleVo.article.cover!==null ? articleVo.article.cover : commonImage" class="thumb" style="display: inline;">
            </a>
            <div class="excerpt-post">
              <header class="">
                <div class="btn btn-danger btn-xs m-zd">置顶</div>
                <a class="btn btn-primary btn-xs cat" href="javascript:;" >{{ cateWithArticle.cateName }}<i></i>
                </a>
                <div class="post-entry-categories">

                    <a href="javascript:;" @click="searchTag(tag.id)" v-for="tag in articleVo.tags" :key="tag.id"
                    >{{ tag.name }}</a>

                </div>
                <h2>
                  <a href="javascript:;" @click="detail(articleVo.article.id)" :title="articleVo.article.title"
                  >{{ articleVo.article.title }}</a>
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
        <div style="text-align: center; margin-top: 16px">
          <el-pagination
              background
              layout="total, prev, pager, next"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              :current-page="pagination.pageNum"
              @size-change="sizeChange"
              @current-change="currentChange"
          />
        </div>
        </div>
      </div>
      <AsideUi/>
    </section>
  </div>
</template>
<script setup lang="ts">
import avatarImg from "@/assets/avatar.jpg";
import AsideUi from "@/common/aside/AsideUi.vue";
import useCategoryArticle from "@/composables/category/useCategoryArticle";
import useCommon from "@/composables/common/useCommon";
import router from "@/router";
import useTagArticle from "@/composables/tag/useTagArticle";
import { formatDate } from "@/utils/dateFormat";
import { likeArticleApi } from "@/api/article/article";
import { ElMessage } from "element-plus";
import { watch } from "vue";
import { useStore } from "@/store";

const store = useStore();
const {searchArticleByTag} = useTagArticle();
const tran = (str: string) => {
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
}
const {cateWithArticle, pagination, sizeChange, currentChange} = useCategoryArticle();
const {commonImage} = useCommon();

// 分类名变化时动态设置页面标题
watch(() => cateWithArticle.cateName, (name) => {
  if (name) {
    const siteName = store.getters.getSysConfig?.title || '超级博客'
    document.title = `${name} - ${siteName}`
  }
}, { immediate: true })

const detail = (id: string) => {
  router.push({name: 'detail', query: {id: id}})
}
const searchTag = (id: string) => {
  searchArticleByTag(id)
}

// 点赞（防重复，同一 session 内每篇只能点一次）
const likedIds = new Set<number>()
const like = async (article: any) => {
  if (likedIds.has(article.id)) {
    ElMessage.warning('您已经点过赞了')
    return
  }
  try {
    const res = await likeArticleApi(article.id)
    if (res && res.code === 200) {
      article.likeCount = res.data
      likedIds.add(article.id)
      ElMessage.success('点赞成功')
    }
  } catch { /* ignore */ }
}
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
.search-btn, .label-primary, #bdcs .bdcs-search-form-submit, #submit, .excerpt .cat {
  background-color: #C38CFF;
}
.btn-primary, .search-input:focus, #bdcs .bdcs-search-form-input:focus, #submit, .plinks ul li a:hover, .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary {
  border-color: #C38CFF;
}
.btn-primary, .label-primary, .branding-primary, .post-copyright:hover, .article-tags a, .pagination ul > .active > a, .pagination ul > .active > span, .pagenav .current, .widget_ui_tags .items a:hover, .sign .close-link, .pagemenu li.active a, .pageheader, .resetpasssteps li.active, #navs h2, #navs nav, .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary, .tag-clouds a:hover {
  background-color: #C38CFF;
}
</style>
