<template>
  <aside class="sidebar">
    <ul class="row">
      <div class="widget widget_ui_posts wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
        <h3>搜索</h3>
        <div class="aside-search">
          <div class="search-input-wrap">
            <i class="fa fa-search prefix-icon"></i>
            <input
              v-model="keyword"
              @keyup.enter.prevent="submit(keyword)"
              type="text"
              placeholder="输入关键字，按 Enter 键搜索…"
              class="search-input"
            >
            <button v-if="keyword" class="clear-btn" @click="keyword = ''" aria-label="清空">
              <i class="fa fa-times-circle"></i>
            </button>
            <button class="submit-btn" @click="submit(keyword)">搜索</button>
          </div>
        </div>
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
const keyword = ref("")
const tagWithCount = reactive<{tags: any[]}>({
  tags: []
})
const submit = (val: string) => {
  if (!val || !val.trim()) return
  router.push({path:'/articles',query:{keyword:val.trim()}})
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

/* ===== 侧栏搜索：与顶部搜索面板同一风格 ===== */
.aside-search {
  padding: 4px 0 6px;
}
.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 36px;
  padding-right: 4px;
  background: #f7f7f9;
  border-radius: 8px;
  transition: background-color .2s ease, box-shadow .2s ease;
}
.search-input-wrap:focus-within {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(195, 140, 255, .25);
}
.prefix-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #909399;
  font-size: 14px;
  pointer-events: none;
}
.search-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #303133;
  padding: 0;
}
.search-input::placeholder { color: #b6b7c1; }

.clear-btn {
  border: none;
  background: transparent;
  color: #c0c4cc;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 14px;
  line-height: 1;
}
.clear-btn:hover { color: #909399; }

.submit-btn {
  margin-left: 6px;
  height: 32px;
  padding: 0 14px;
  border: none;
  border-radius: 6px;
  background: #C38CFF;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: background-color .2s ease;
  white-space: nowrap;
}
.submit-btn:hover { background: #a86ff0; }
</style>
<style src="@/assets/style/main.css" scoped></style>
