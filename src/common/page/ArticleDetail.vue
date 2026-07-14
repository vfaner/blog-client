<template style="background-color: #8a8f97">
  <section class="article-focusbox bgimg-fixed" id="focsbox-true" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
    <header class="article-header">
      <h1 class="article-title" v-text="articleData.title"></h1>
      <div class="article-meta">
        <span class="item item-1"><i class="fa fa-clock-o"></i> {{ formatDate(articleData.modified_time || articleData.created_time) }}</span>
        <span class="item"><i class="fa fa-eye"></i> 阅读({{ articleData.viewCount || 0 }})</span>
        <span class="item"><i class="fa fa-comments-o"></i> 评论({{ articleData.commentCount || 0 }})</span>
        <span class="item"><i class="fa fa-thumbs-o-up"></i> 赞({{ articleData.likeCount || 0 }})</span>
        <span class="item item-4" v-if="articleData.categories && articleData.categories.length">
          分类：
          <a href="javascript:;" v-for="c in articleData.categories" :key="c.id" style="margin-right:6px">{{ c.name }}</a>
        </span>
      </div>
    </header>

  </section>
  <section class="container">
    <div class="content-wrap">
      <div class="leftsd">
        <div id="leftsd" class="left top">
          <div class="introduce wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
            <img :src="avatarImg" class="avatar avatar-50 photo" height="50" width="50" alt="作者头像" style="display: inline;">
            <h4>作者：<a title="查看更多文章" href="javascript:;"> {{articleData.author}}</a></h4>
            <p>
              感谢阅读本文，欢迎收藏与分享！
            </p>
          </div>
          <div class="left-tags wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
            <p>
              标签：
            </p>
            <span v-show="articleData.tags.length!==0"
                  v-for="item in articleData.tags"
                  :key="item.name"
                  @click="searchTag(item.id)"
                  style="cursor:pointer;color:#409eff;margin:0 4px;display:inline-block"
                  >{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="single-content">

        <article class="article-content" id="image_container">
          <div class="wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
          </div>
          <!-- <a rel="external nofollow" target="_blank" href="https://cloud.tencent.com/act/cps/redirect?redirect=1048&cps_key=ddf43498adbfdc508bd6e3efa42c60cd&from=console"><img alt="腾讯云" width="760" height="90" src="https://huayula.com/t/txy.jpg"></a> -->
<!--          <span>-->
<!--            <u-fold unfold line="30">-->
<!--              <span v-html="articleData.content"></span>-->
<!--          </u-fold>-->
<!--          </span>-->
          <span v-html="articleData.content"></span>
          <DownLoad
              v-if="articleData.downloadEnable"
              :download-name="articleData.downloadName"
              :download-url="articleData.downloadUrl"
              :download-size="articleData.downloadSize"
              :download-desc="articleData.downloadDesc"
          />
        </article>
        <div class="shuoming wow zoomIn" style="visibility: visible; animation-name: none;">
          <Reward />
        </div>
        <div class="shuoming wow zoomIn" style="visibility: visible; animation-name: none;">
          <div class="title">
            <span style="color: #e67e23">未经允许不得转载：</span>
          </div>
        </div>
        <div class="smhb">
          <p class="shengming" style="background-color: #f8f9fa;padding:12px 16px;border-radius:6px;color:#606266;font-size:13px;line-height:1.8">
            <span style="color: red"><b>温馨提示：</b></span>本站所有文章，如无特殊说明或标注，均为本站原创发布。任何个人或组织，在未征得本站同意时，禁止复制、盗用、采集、发布本站内容到任何网站、书籍等各类媒体平台。如若本站内容侵犯了原著者的合法权益，可联系我们进行处理。
          </p>
        </div>

        <div class="article-tags wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;" v-if="articleData.tags && articleData.tags.length">
          标签：
          <a href="javascript:void(0)"
             v-for="item in articleData.tags"
             :key="item.name"
             :type="item.type"
             @click="searchTag(item.id)"
             style="margin:0 4px;cursor:pointer">{{item.name}}</a>
        </div>
        <div id="comments" class="shuoming wow zoomIn" style="visibility: visible; animation-name: none;">
          <Comment />
        </div>
      </div>
    </div>
    <aside-ui />
  </section>
<!--  <div aria-label="A complete example of page header">-->
<!--    <el-row :gutter="10">-->
<!--      <el-col :span="16">-->
<!--        <el-card class="box-card">-->
<!--          <div class="mt-4 text-sm">-->
<!--            <u-fold unfold line="30">-->
<!--              <span v-html="articleData.content"></span>-->
<!--            </u-fold>-->

<!--          </div>-->
<!--          <div style="padding: 10px;margin-top:10px;margin-bottom:10px;background-color: #f8f9fa">-->
<!--            <span style=" font-size:5px">-->
<!--              <strong>声明</strong>：-->
<!--            </span>-->
<!--          </div>-->
<!--          <div>-->
<!--            <span>-->
<!--              <el-tag-->
<!--                  v-show="articleData.tags.length!==0"-->
<!--                  v-for="item in articleData.tags"-->
<!--                  :key="item.name"-->
<!--                  :type="item.type"-->
<!--                  class="mx-1"-->
<!--                  effect="dark"-->
<!--                  style="margin-left: 5px"-->
<!--              >-->
<!--                 <span style="cursor: pointer;" @click="searchTag(item.id)">-->
<!--                {{ item.name }}-->
<!--                </span>-->
<!--             </el-tag>-->
<!--          </span>-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <el-card class="box-card" :body-style="{ padding: '0px' }" style="margin-top: 15px">-->
<!--            <Comment />-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <Aside />-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </div>-->
</template>

<script setup lang="ts">
// @ts-nocheck
import avatarImg from "@/assets/avatar.jpg";
import useGetArticle from "@/composables/article/userGetArticle";
import router from "@/router";
import {ref, watch, onMounted, computed, nextTick} from "vue";
import {useRoute} from "vue-router";
import { useStore } from "@/store";
import { formatDate } from "@/utils/dateFormat";
import { likeArticleApi } from "@/api/article/article";
import { ElMessage } from "element-plus";
// import Aside from "@/common/aside/Aside.vue";
import useTagArticle from "@/composables/tag/useTagArticle";
import Comment from "@/common/comment/Comment.vue";
import DownLoad from "@/common/download/DownLoad.vue";
import "../../assets/js/bootstrap.min"
import AsideUi from "@/common/aside/AsideUi.vue";
import Reward from "@/common/reward/Reward.vue";
const {searchArticleByTag} = useTagArticle();
const route = useRoute();
const store = useStore();

const {articleData} = useGetArticle();

// 文章标题变化时，动态设置页面标题为「文章标题 - 网站名」
watch(() => articleData.title, (title) => {
  if (title) {
    const siteName = store.getters.getSysConfig?.title || '超级博客'
    document.title = `${title} - ${siteName}`
  }
}, { immediate: true })

// 从后台"查看"进来时，文章内容加载后滚动到评论区
watch(() => articleData.content, (content) => {
  if (content && (route.query.comment || window.location.hash === '#comments')) {
    nextTick(() => {
      setTimeout(() => {
        const el = document.getElementById('comments')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 600)
    })
  }
})

const searchTag = (id:string) => {
  searchArticleByTag(id)
}

// const onBack = () => {
//   router.go(-1)
// }
// watch(() =>route.params.id,(newValue,oldValue)=> {
//   if(newValue!==oldValue){
//     getArticle(newValue)
//   }
// },{ immediate: true })

const keyword = ref<string>("")
const searchBtn = (keyword:string) => {
  // getArticleList(keyword)
  router.push({name:'article_search',params: {key:keyword}})
}
const tran=(str:string)=>{
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
}

const like = async (id: number) => {
  if (likedIds.has(id)) { ElMessage.warning('您已经点过赞了'); return }
  try {
    const res = await likeArticleApi(id)
    if (res && res.code === 200) {
      articleData.likeCount = res.data
      likedIds.add(id)
      ElMessage.success('点赞成功')
    }
  } catch { /* ignore */ }
}
const likedIds = new Set<number>()

</script>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
<style src="@/assets/style/main.css" scoped></style>
<style src="@/assets/style/bootstrap.min.css" scoped></style>
