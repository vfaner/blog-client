<template>
  <div class="my-articles">
    <div class="page-header">
      <h3 class="section-title">我的文章</h3>
      <el-button type="primary" size="small" @click="goWrite">
        <i class="fa fa-pencil-square-o"></i>&nbsp;写文章
      </el-button>
    </div>

    <div v-if="loading" class="loading-state">
      <el-skeleton :rows="4" animated />
    </div>

    <div v-else-if="list.length === 0" class="empty-state">
      <i class="fa fa-file-o"></i>
      <p>还没有文章，去<a href="javascript:;" @click="goWrite">发布第一篇</a>吧～</p>
    </div>

    <ul v-else class="article-list">
      <li v-for="a in list" :key="a.id" class="article-card" @click="detail(a.id)">
        <div class="cover">
          <img :src="a.cover || commonImage" :alt="a.title">
        </div>
        <div class="body">
          <div class="title-row">
            <span v-if="a.categories && a.categories.length"
                  class="badge badge-cate">{{ a.categories[0].name }}</span>
            <h4 class="title" :title="a.title">{{ a.title }}</h4>
            <span v-if="a.tags && a.tags.length"
                  class="badge badge-tag">{{ a.tags[0].name }}</span>
          </div>
          <p class="excerpt">{{ cleanText(a.content) }}</p>
          <div class="meta">
            <span class="author">
              <img :src="a.avatar || avatarImg" class="avatar-sm">
              {{ a.author || currentUser }}
            </span>
            <span><i class="fa fa-eye"></i> 阅读({{ a.viewCount || 0 }})</span>
            <span><i class="fa fa-comments-o"></i> 评论({{ a.commentCount || 0 }})</span>
            <span><i class="fa fa-clock-o"></i> {{ formatDate(a.createdTime || a.createTime) }}</span>
            <span class="like-pill"><i class="fa fa-thumbs-o-up"></i> 赞({{ a.likeCount || 0 }})</span>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="!loading && total > pageSize" class="pager">
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getArticlePageApi } from '@/api/article/article'
import { formatDate } from '@/utils/dateFormat'
import avatarImg from '@/assets/avatar.jpg'
import useCommon from '@/composables/common/useCommon'

const store = useStore()
const router = useRouter()
const { commonImage } = useCommon()

const currentUser = computed(() => {
  const info = store.getters.getInfo || {}
  return info.username || info.login_name || ''
})

const list = ref<any[]>([])
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const loading = ref(false)

const cleanText = (str: string | undefined): string => {
  if (!str) return ''
  const plain = str
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<[^>]+?>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.length > 120 ? plain.slice(0, 120) + '…' : plain
}

const load = async () => {
  if (!currentUser.value) return
  loading.value = true
  try {
    const res = await getArticlePageApi({
      author: currentUser.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    if (res && res.code === 200 && res.data) {
      // 后端 ArticlePage 返回 { content: ArticleVo[], total, pageNum, pageSize }
      const data = res.data
      const rows = data.content || data.list || data.records || []
      list.value = rows.map((item: any) => {
        // ArticleVo 结构：{ article, categories, tags, commentCount }
        if (item.article) {
          return {
            ...item.article,
            categories: item.categories || [],
            tags: item.tags || [],
            commentCount: item.commentCount || 0
          }
        }
        return item
      })
      total.value = data.total || rows.length
    }
  } finally {
    loading.value = false
  }
}

const onPageChange = (page: number) => {
  pageNum.value = page
  load()
}

const detail = (id: number | string) => {
  router.push({ name: 'detail', query: { id: String(id) } })
}
const goWrite = () => router.push('/user/write_article')

onMounted(load)
</script>

<style scoped lang="scss">
.my-articles { padding: 4px 0 20px; }

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  position: relative;
  padding-left: 12px;
}
.section-title::before {
  content: '';
  position: absolute;
  left: 0; top: 3px; bottom: 3px;
  width: 4px;
  background: #C38CFF;
  border-radius: 2px;
}

.loading-state, .empty-state {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  color: #909399;
}
.empty-state i {
  font-size: 56px;
  color: #dcdfe6;
  display: block;
  margin-bottom: 10px;
}
.empty-state a { color: #409eff; margin: 0 4px; }

.article-list { list-style: none; padding: 0; margin: 0; }
.article-card {
  display: flex;
  gap: 18px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 14px;
  cursor: pointer;
  transition: box-shadow .2s ease, transform .2s ease;
  overflow: hidden;
}
.article-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  transform: translateY(-2px);
}
.cover {
  flex: 0 0 200px;
  height: 130px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f7fa;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.title {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge {
  display: inline-block;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  flex-shrink: 0;
}
.badge-cate {
  background: #f0e6ff;
  color: #8a4bff;
}
.badge-tag {
  background: #ffece8;
  color: #ff5959;
}
.excerpt {
  color: #909399;
  font-size: 13px;
  line-height: 1.7;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  font-size: 12px;
  color: #909399;
  margin-top: auto;
}
.meta i { margin-right: 4px; }
.meta .author {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #606266;
}
.avatar-sm {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
.like-pill {
  margin-left: auto;
  padding: 4px 12px;
  border-radius: 20px;
  background: #f4ecff;
  color: #8a4bff;
}

.pager {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .article-card { flex-direction: column; }
  .cover { flex: 0 0 auto; width: 100%; height: 180px; }
  .like-pill { margin-left: 0; }
}
</style>
