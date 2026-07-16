<template>
  <aside class="sidebar">
    <ul class="row">
      <div class="widget widget_ui_posts wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
        <h3>搜索</h3>
        <ul class="list-unstyled souul">
            <div class="input-group">
              <input v-model="keyword" class="form-control search soutext" @keyup.enter.prevent="enters(keyword)" type="text" onfocus="if (value =='请善用搜索功能'){value =''}" onblur="if (value ==''){value='请善用搜索功能'}">
              <div class="input-group-btn"> <button @click="submit(keyword)" class="btn btn-default soubtn" type="button">搜索</button> </div>
            </div>
        </ul>
      </div>
      <div class="widget widget_ui_posts wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
        <h3>随机文章</h3>
        <ul>
          <li v-for="article in articleRandom.list" :key="article.id">
            <a href="javascript:;" @click="detail(article.id)">
            <span class="thumbnail"><img :data-src="article.cover ? article.cover : commonImage"
                                         :alt="article.title" :src="article.cover ? article.cover : commonImage"  class="thumb" style="display: block;"></span>
            <span class="text">{{article.title}}</span>
            <span class="aside-meta">{{article.time}} · 阅读({{ article.viewCount || 0 }})</span></a>
          </li>

        </ul>
      </div>
      <div class="widget widget_ui_tags wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
        <h3>标签</h3>
        <ul>
          <a href="javascript:;" v-for="tag in tagWithCount.tags" :key="tag.id"  @click="tagUnderArticle(tag.id)">{{tag.name}} ({{tag.count}})</a>
        </ul>
      </div>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import router from "@/router";
import {onMounted, reactive, ref, watch} from "vue";

import {tagCountApi} from "@/api/tag/tag";
import useRandomArticle from "@/composables/article/useRandomArticle";
import useCommon from "@/composables/common/useCommon";
import useArticleSearch from "@/composables/article/useArticleSearch";
import {useRoute} from "vue-router";
// const {getTagWithCount,tagWithCount} = useTagArticle();
const {commonImage} = useCommon();
const route = useRoute();
const {articleRandom,getArticleRandomList} = useRandomArticle();
const {getArticleList} = useArticleSearch();
const keyword = ref("请善用搜索功能")
const tagWithCount = reactive<{tags: any[]}>({
  tags: []
})
const enters = (val: string) => {
  router.push({path:'/articles',query:{keyword:val}})
}
const submit = (val: string) => {
  // router.push({name:'article_search',params: {key:val}})
  router.push({path:'/articles',query:{keyword:val}})
}
const tagUnderArticle = (val: number|string) => {
  router.push({name:'tag_article',params: {id:val}})
}

const detail = (id: string) => {
  router.push({name: 'detail', query: {id: id}})
}

//标签侧栏
const getTagWithCount = async () => {
  let res = await tagCountApi()
  if (res) {
    tagWithCount.tags = res.data
  }
}
watch(() => route.query.keyword, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue) {
    getArticleList(String(newValue))
  }
}, {immediate: true})
onMounted(()=>{
  getTagWithCount()
  getArticleRandomList()
})
</script>
<style scoped lang="scss">
.aside-meta {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
<style src="@/assets/style/main.css" scoped></style>
