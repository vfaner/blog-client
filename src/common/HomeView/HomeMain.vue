<template>
  <div id="fee">
    <section class="container">
      <div class="content-wrap">
        <div class="content">

          <div class="speedbar wow zoomIn animated" style="visibility: visible; animation-name: zoomIn; background-color: #ecf5ff">
            <a class="tpclose" @click="hidetp"><i class="fa fa-times"></i></a>
            <div class="toptip" id="callboard">
              <u-notice-bar
                  background="#ecf5ff"
                  color="#409eff"
                  prefix-icon="dianzan"
                  suffix-icon="comment"
                  :data="conf.advisory"
              ></u-notice-bar>
<!--              <ul style="font-size: 14px; margin-top: 2px;">-->
<!--                <li class="bulletin">-->
<!--                  <a href="./about">-->
<!--                    超级资源博客</a>-->
<!--                </li><li class="bulletin">-->
<!--                  <a href="./about">-->
<!--                    超级资源博客欢迎你</a>-->
<!--                </li>-->
<!--              </ul>-->
            </div>
        </div>
        <!--<article class="excerpt-minic excerpt-minic-index wow zoomIn animated" style="display: block; visibility: visible; animation-name: zoomIn;">
          <div class="post-entry-categories">
            <a href="./tag/QQJSON">QQJSON</a>
            <a href="./tag/QQxml">QQxml</a>
            <a href="./tag/QQ%E5%8D%A1%E7%89%87">QQ卡片</a>
          </div>
          <h2>
            <a class="red" href="./sort/recommend">站内公告</a>
            <a href="./post-950.html" title="《华雨拉QQ卡片资源典藏全集》">《华雨拉QQ卡片资源典藏全集》</a>
          </h2>
          <p class="note">
            华雨拉(huayula.com)为持续测试与提供可用的QQxml、QQjson、推广引流代码、优质资源等，专业性影响力位居业内前列！这里为大家提供《华雨拉QQ卡片资源典藏全集》，并且持续更新！内容包括不限于：1.《新人好礼——快速入门QQ卡片发布操作》（1）《入门操作必看》（2）《进阶操作必...</p>
        </article> -->
        <div class="new-position col-lg-12">
          <div class="right phb_other1">
            <div class="title">
              <span class="title-text">最近更新</span>
              <span class="title-meta">
                今日已更新 <b class="hl">{{ articleShow.today }}</b> 个资源
                <span class="sep">|</span>
                本站共分享了 <b class="hl">{{ articleShow.total }}</b> 个资源
              </span>
            </div>
            <div class="r-content">
              <ul class="recent-list">
                <li v-for="article in articleShow.list" :key="article.id">
                  <a href="javascript:;" @click="detail(article.id)"
                     :style="{ color: article.top ? '#ff5e52' : '' }"
                     v-text="article.title"></a>
                  <i class="ad" v-if="article.top">置顶</i>
                  <span v-else class="time-tag"
                        :style="{ color: article.time === nowTime ? '#ff5e52' : '' }"
                        v-text="article.time"></span>
                </li>
              </ul>
              <div class="list-loading" v-if="!articleShow.list || articleShow.list.length === 0">
                <div class="loadding2">
                  <div class="circ1"></div>
                  <div class="circ2"></div>
                  <div class="circ3"></div>
                  <div class="circ4"></div>
                </div>
              </div>
            </div>
            <div class="page-bar" :data-nowpage="articleShow.pageNum">
              <button class="page-btn" :disabled="currentPage <= 1" @click="prevPage">
                <i class="fa fa-angle-left"></i> 上一页
              </button>
              <div class="page-indicator">
                第 <b>{{ currentPage }}</b> / {{ totalPages }} 页
              </div>
              <button class="page-btn" :disabled="currentPage >= totalPages" @click="nextPage">
                下一页 <i class="fa fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="layui-clear" style="clear: both;"></div>
        <!-- 动态卡片区域 -->
          <template v-for="(card, index) in cards" :key="card.id">
            <!-- 第一张卡片：全宽大图布局 -->
            <div v-if="index === 0" class="catlist cat-container clearfix">
              <h2 class="home-heading clearfix">
                <span class="heading-text wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">{{ card.name }}</span>
                <a href="javascript:;" @click="cateUnderArticles(card.id)">更多 <i class="fa fa-plus-circle"></i></a>
              </h2>
              <div class="cms-cat cms-cat-s5">
                <div class="col col-left" v-for="article in card.articles" :key="article.id">
                  <article class="post type-post status-publish format-standard wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
                    <div class="entry-thumb hover-scale">
                      <a href="javascript:;" @click="detail(article.id)"><img :alt="article.title" :src="article.cover ? article.cover : commonImage" class="thumb">{{ article.title }}</a>
                    </div>
                    <div class="entry-detail">
                      <h3 class="entry-title"><a href="javascript:;" @click="detail(article.id)">{{ article.title + conf.title }}</a></h3>
                      <p class="entry-excerpt">{{ tran(article.content) }}</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <!-- 奇数索引的卡片对：两个半宽列表布局 -->
            <div v-else-if="index % 2 === 1" class="catlist clr cat-container clearfix">
              <div class="catlist-0 cat-col-1_2">
                <div class="cat-container clearfix">
                  <h2 class="home-heading clearfix">
                    <span class="heading-text wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">{{ card.name }}</span>
                    <a href="javascript:;" @click="cateUnderArticles(card.id)">更多 <i class="fa fa-plus-circle"></i></a>
                  </h2>
                  <div class="cms-cat cms-cat-s0">
                    <div class="row-small" v-for="article in card.articles" :key="article.id">
                      <article class="post type-post status-publish format-standard wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
                        <div class="entry-detail">
                          <h3 class="entry-title"><strong>[{{ article.time }}]</strong><i class=""></i><a href="javascript:;" @click="detail(article.id)">{{ article.title }}</a></h3>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              <div class="catlist-0 cat-col-1_2" v-if="index + 1 < cards.length">
                <div class="cat-container clearfix">
                  <h2 class="home-heading clearfix">
                    <span class="heading-text wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">{{ cards[index + 1].name }}</span>
                    <a href="javascript:;" @click="cateUnderArticles(cards[index + 1].id)">更多 <i class="fa fa-plus-circle"></i></a>
                  </h2>
                  <div class="cms-cat cms-cat-s0">
                    <div class="row-small" v-for="article in cards[index + 1].articles" :key="article.id">
                      <article class="post type-post status-publish format-standard wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">
                        <div class="entry-detail">
                          <h3 class="entry-title"><strong>[{{ article.time }}]</strong><i class=""></i><a href="javascript:;" @click="detail(article.id)">{{ article.title }}</a></h3>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
      </div>
      </div>
<!--      <div class="wzsid sidebar">-->
<!--      <div class="widget wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">-->
<!--        <div class="widget widget_ui_tags wow fadeInUp animated animated" style="visibility: visible; animation-name: fadeInUp;">-->
<!--      <h3>推荐优质资源</h3>-->
<!--      <div class="tp_advertising">-->
<!--        <p>广告</p>-->
<!--        <div class="tp_1">-->
<!--          <a href="./post-902.html" target="_blank">QQ卡片入门必读</a>-->
<!--          <a href="./post-890.html" target="_blank">QQ卡片代码基础</a>-->
<!--          <a href="./post-921.html" target="_blank">QQ红包引流进群</a>-->
<!--        </div>-->
<!--        <div class="tp_2">-->
<!--          <a href="#" target="_blank">源码通宝</a>-->
<!--          <a href="#" target="_blank">网站源码下载</a>-->
<!--          <a href="#" target="_blank">运营兔</a>-->
<!--        </div>-->
<!--        <div class="tp_3">-->
<!--          <a href="#" target="_blank" rel="nofollow">niumi.cn</a>-->
<!--          <a href="#" target="_blank" rel="nofollow">huwan.cn</a>-->
<!--          <a href="#" target="_blank" rel="nofollow">hutui.cn</a>-->
<!--        </div>-->
<!--          </div>-->
<!--      </div></div>-->
<!--        <div class="widget widget_ui_posts wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">-->
<!--          <h3>搜索</h3>-->
<!--          <ul class="list-unstyled souul">-->
<!--              <form name="keyform" method="get" action="./">-->
<!--                  <div class="input-group">-->
<!--                      <input name="keyword" value="请善用搜索功能" class="form-control search soutext" type="text" onfocus="if (value ==&#39;请善用搜索功能&#39;){value =&#39;&#39;}" onblur="if (value ==&#39;&#39;){value=&#39;请善用搜索功能&#39;}">-->
<!--                      <div class="input-group-btn"> <button class="btn btn-default soubtn">搜索</button> </div>-->
<!--                  </div>-->
<!--              </form>-->
<!--          </ul>-->
<!--          </div>-->
<!--        <div class="widget widget_ui_posts wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">-->
<!--          <h3>热门文章</h3>-->
<!--          <ul>-->
<!--&lt;!&ndash;            6&ndash;&gt;-->
<!--            <li><a title="动态图的QQXML代码示例——篮球规范动作示范！" href="#"><span class="thumbnail"><img alt="动态图的QQXML代码示例——篮球规范动作示范！" :src="lanqiu" class="thumb" style="display: block;"></span><span class="text">动态图的QQXML代码示例——篮球规范动作示范！</span><span class="muted">2020-07-12</span><span class="muted">阅读(119612)</span></a></li>-->
<!--            <li><a title="QQ图片跳转-QQXML-QQJSON卡片生成器分享" href=".#"><span class="thumbnail"><img alt="QQ图片跳转-QQXML-QQJSON卡片生成器分享" :src="xml30" class="thumb" style="display: block;"></span><span class="text">QQ图片跳转-QQXML-QQJSON卡片生成器分享</span><span class="muted">2019-12-09</span><span class="muted">阅读(39739)</span></a></li>-->
<!--          </ul>-->
<!--        </div>-->
<!--        <div class="widget widget_ui_tags wow zoomIn animated" style="visibility: visible; animation-name: zoomIn;">-->
<!--          <h3>标签</h3>-->
<!--          <ul>-->
<!--                <a title="155 篇文章" href="./tag/%E7%94%B5%E8%84%91%E8%BD%AF%E4%BB%B6">电脑软件 (155)</a>-->
<!--                <a title="2 篇文章" href="./tag/%E7%8E%B0%E9%87%91%E6%B4%BB%E5%8A%A8">现金活动 (2)</a>-->
<!--                <a title="1 篇文章" href="./tag/word%E6%96%87%E6%A1%A3%E7%A0%B4%E8%A7%A3">word文档破解 (1)</a>-->
<!--                <a title="9 篇文章" href="./tag/%E5%AE%89%E5%8D%93%E6%B8%B8%E6%88%8F">安卓游戏 (9)</a>-->
<!--                <a title="3 篇文章" href="./tag/QQ%E7%BA%A2%E5%8C%85%E8%B7%B3%E8%BD%AC%E7%BE%A4%E9%93%BE%E6%8E%A5">QQ红包跳转群链接 (3)</a>-->
<!--                <a title="1 篇文章" href="./tag/%E5%8D%8E%E9%9B%A8%E6%8B%89%E5%AE%98%E6%96%B9%E7%BE%A4">华雨拉官方群 (1)</a>-->

<!--              </ul>-->
<!--        </div>-->
<!--      </div>-->
      <AsideUi />
    </section>
  </div>
<!--  <div id="landlord" style="left:5px;bottom:0px;" class="ui-draggable">-->
  <!--    <div class="message" style="opacity:0"></div>-->
  <!--    <canvas id="live2d" width="500" height="560" class="live2d"></canvas>-->
  <!--    <div class="live_talk_input_body">-->
  <!--      <div class="live_talk_input_name_body"><input name="name" type="text" class="live_talk_name white_input" id="AIuserName" autocomplete="off" placeholder="你的名字">-->
  <!--      </div>-->
  <!--      <div class="live_talk_input_text_body"><input name="talk" type="text" class="live_talk_talk white_input" id="AIuserText" autocomplete="off" placeholder="要和我聊什么呀？">-->
  <!--        <button type="button" class="live_talk_send_btn" id="talk_send">发送</button>-->
  <!--      </div>-->
  <!--    </div><input name="live_talk" id="live_talk" value="1" type="hidden">-->
  <!--    <div class="live_ico_box">-->
  <!--      <div class="live_ico_item type_info" id="showInfoBtn"></div>-->
  <!--    <div class="live_ico_item type_talk" id="showTalkBtn"></div>-->
  <!--    <div class="live_ico_item type_music" id="musicButton"></div>-->
  <!--    <div class="live_ico_item type_type" id="type"></div>-->
  <!--    <div class="live_ico_item type_youdu" id="youduButton"></div>-->
  <!--    <div class="live_ico_item type_quit" id="hideButton"></div>-->
  <!--    <audio src="" style="display:none;" id="live2d_bgm" data-bgm="0" preload="none"></audio><input name="live_statu_val" id="live_statu_val" value="0" type="hidden"><input id="duType" value="douqilai,l2d_caihong" type="hidden">-->
  <!--  </div>-->
<!--  </div>-->
</template>
<script lang="ts" setup>
import '@/utils/tooltip'
import AsideUi from "@/common/aside/AsideUi.vue";
import useArticleIndexShow from "@/composables/article/useArticleIndexShow";
import {computed, onMounted, reactive, ref} from "vue";
import useCommon from "@/composables/common/useCommon";
import {useRouter} from "vue-router";
import {useStore} from "@/store";
import {ConfigModel} from "@/api/system/SystemModel";
import {getHomeCardRenderApi} from "@/api/system/system";

const {commonImage} = useCommon();
const {articleShow, listParam, getArticleIndexList} = useArticleIndexShow()
const router = useRouter();
const store = useStore();

const detail = (id: number) => {
  router.push({name: 'detail', query: {id: String(id)}})
}
const cateUnderArticles = (id: number) => {
  router.push({name: 'category_article', params: {id: String(id)}})
}

// 最近更新翻页
const totalPages = computed(() => {
  const size = articleShow.pageSize || listParam.pageSize || 10
  const total = articleShow.total || 0
  return Math.max(1, Math.ceil(total / size))
})
const currentPage = computed(() => articleShow.pageNum || listParam.pageNum || 1)
const prevPage = () => {
  if (currentPage.value <= 1) return
  listParam.pageNum = currentPage.value - 1
  getArticleIndexList()
}
const nextPage = () => {
  if (currentPage.value >= totalPages.value) return
  listParam.pageNum = currentPage.value + 1
  getArticleIndexList()
}

// 动态卡片数据
const cards = reactive<Array<{id: number; name: string; articles: any[]}>>([])

onMounted(async () => {
  try {
    const res = await getHomeCardRenderApi()
    if (res && res.code === 200 && res.data) {
      cards.splice(0, cards.length, ...res.data)
    }
  } catch {
    // 后端不可用时静默处理，页面正常展示空卡片
  }
})

// 处理时间
const nowTime = ref("");
(function() {
  function getNow(s: number) {
    return s < 10 ? '0' + s : String(s);
  }
  let objD = new Date;
  nowTime.value = getNow(objD.getMonth()+1)+"-"+getNow(objD.getDate());
})();

const tran = (str: string) => {
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
}

const hidetp = () => {
  const el = document.querySelector('.speedbar') as HTMLElement
  if (el) el.style.display = 'none'
}

const conf = computed<ConfigModel>(() => store.getters.getSysConfig || {} as ConfigModel)
</script>
<style src="@/assets/style/main.css" scoped></style>
<style scoped lang="scss">
/* ===== 首页"最近更新"卡片：现代化 flex 布局 ===== */
.new-position :deep(.right) {
  padding: 16px 24px 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .04);
}

/* 卡片顶部标题条 */
.new-position :deep(.title) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 4px;
  margin-bottom: 6px;
  text-indent: 0;
  line-height: 1;
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  position: relative;
}
.new-position :deep(.title .title-text) {
  padding-left: 12px;
  position: relative;
}
.new-position :deep(.title .title-text::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  bottom: 2px;
  width: 4px;
  border-radius: 2px;
  background: #C38CFF;
}
.new-position :deep(.title .title-meta) {
  font-size: 13px;
  font-weight: normal;
  color: #909399;
  float: none;
  letter-spacing: 0;
}
.new-position :deep(.title .title-meta .hl) { color: #ff5e52; font-weight: 600; margin: 0 3px; }
.new-position :deep(.title .title-meta .sep) { margin: 0 8px; color: #dcdfe6; }

/* 列表区域：两列平均 */
.new-position :deep(.r-content) { position: relative; }
.new-position :deep(.recent-list) {
  list-style: none;
  padding: 12px 0 4px;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 2px;
}
.new-position :deep(.recent-list li) {
  /* 覆盖 main.css 里 .new-position .r-content ul li 的 float/width/padding */
  float: none !important;
  width: auto !important;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 36px;
  border-bottom: 1px dashed #f4f4f4;
  overflow: hidden;
}
.new-position :deep(.recent-list li a) {
  /* 覆盖 main.css 里的 float/max-width/text-indent 等 */
  float: none !important;
  display: block;
  flex: 1;
  min-width: 0;
  max-width: 100% !important;
  height: 36px;
  line-height: 36px;
  padding-left: 14px;
  text-indent: 0 !important;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
.new-position :deep(.recent-list li a:before) {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: #d0d3d9;
  border-radius: 50%;
}
.new-position :deep(.recent-list li a:hover) { color: #C38CFF; }
.new-position :deep(.recent-list li a:hover:before) { background: #C38CFF; }
.new-position :deep(.recent-list li .time-tag) {
  float: none !important;
  font-size: 12px;
  color: #b8b8b8;
  white-space: nowrap;
  flex-shrink: 0;
}
.new-position :deep(.recent-list li .ad) {
  font-style: normal;
  padding: 1px 6px;
  border: 1px solid #ff5e52;
  color: #ff5e52;
  font-size: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

/* ===== 分页按钮：现代 flex 两栏对齐 ===== */
.new-position :deep(.page-bar) {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
.new-position :deep(.page-btn) {
  flex: 1;
  height: 40px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: #fff;
  color: #606266;
  cursor: pointer;
  font-size: 14px;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.new-position :deep(.page-btn:hover) {
  background: #f7f5ff;
  border-color: #C38CFF;
  color: #C38CFF;
}
.new-position :deep(.page-btn:disabled) {
  color: #c0c4cc;
  cursor: not-allowed;
  background: #fafafa;
}
.new-position :deep(.page-indicator) {
  align-self: center;
  color: #909399;
  font-size: 13px;
  min-width: 90px;
  text-align: center;
  white-space: nowrap;
}
.new-position :deep(.page-indicator b) {
  color: #C38CFF;
  font-weight: 600;
  margin: 0 2px;
}

@media (max-width: 768px) {
  .new-position :deep(.title) { flex-direction: column; align-items: flex-start; height: auto; padding: 10px 4px; gap: 4px; }
  .new-position :deep(.recent-list) { grid-template-columns: 1fr; column-gap: 0; }
}
</style>
