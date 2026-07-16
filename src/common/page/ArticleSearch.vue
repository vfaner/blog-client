<template style="background-color: #f6f6f6">

  <div id="fee">
    <section class="container">
      <div class="pagetitle"><h1>本次搜索帮您找到有关 <strong v-text="route.query.keyword" style="color:red;"></strong> 的结果<strong v-text="articleList.total" style="color:red;"></strong>条</h1></div>
      <div class="content-wrap">
        <div class="content">
<span v-for="articleVo in articleList.list" :key="articleVo.article.id">
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
                <a class="btn btn-primary btn-xs cat" href="javascript:;">{{articleVo.categories[0].name}}<i></i>
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

        </div>
        <div style="text-align: center; margin-top: 16px">
          <el-pagination
              background
              layout="total, prev, pager, next, sizes"
              :total="articleList.total"
              :page-size="articleList.pageSize"
              :current-page="articleList.pageNum"
              @size-change="sizeChange"
              @current-change="currentChange"
          />
        </div>
      </div>
      <AsideUi/>

    </section>
  </div>
  <!--  <div>-->
  <!--    <div style="margin-top: 15px">-->
  <!--      <h1 style="font-size: 24px;color: #303133" v-text="'本次搜索帮您找到有关 '+route.params.key+' 的结果 '+articleList.list.length+' 条'"></h1></div>-->
  <!--    <div style="margin-bottom: 15px"></div>-->
  <!--    <el-row :gutter="10">-->
  <!--      <el-col :span="16">-->
  <!--        <div v-for="article in articleList.list" :key="article.id">-->
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
import useCommon from "@/composables/common/useCommon";
import router from "@/router";
import useArticleSearch from "@/composables/article/useArticleSearch";
import {useRoute} from "vue-router";
import AsideUi from "@/common/aside/AsideUi.vue";
import useTagArticle from "@/composables/tag/useTagArticle";
import { formatDate } from "@/utils/dateFormat";
import { likeArticleApi } from "@/api/article/article";
import { ElMessage } from "element-plus";

const route = useRoute();
const tran = (str: string) => {
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
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
const {searchArticleByTag} = useTagArticle();
const {key, articleList, currentChange, sizeChange} = useArticleSearch();
const {commonImage} = useCommon();
const detail = (id: string) => {
  router.push({name: 'detail', query: {id: id}})
}
const searchTag = (id: string) => {
  searchArticleByTag(id)
}
</script>
<style src="@/assets/style/main.css" scoped></style>
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
