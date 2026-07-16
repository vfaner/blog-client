<template>
  <div class="my-comments">
    <div class="page-header">
      <h3 class="section-title">我的评论</h3>
    </div>

    <div v-if="loading" class="loading-state">
      <el-skeleton :rows="3" animated />
    </div>

    <div v-else-if="list.length === 0" class="empty-state">
      <i class="fa fa-comment-o"></i>
      <p>还没有评论过任何文章～</p>
    </div>

    <ul v-else class="comment-list">
      <li v-for="c in list" :key="c.uid" class="comment-item">
        <div class="head">
          <span class="article-title" @click="goArticle(c.articleId, c.uid)">
            <i class="fa fa-file-text-o"></i>
            {{ c.articleName || `文章 #${c.articleId}` }}
          </span>
          <span class="time">
            <i class="fa fa-clock-o"></i>
            {{ c.createTime || formatDate(c.createdTime) }}
          </span>
        </div>
        <div class="content" v-html="cleanContent(c.content)"></div>
        <div class="foot">
          <span class="likes"><i class="fa fa-thumbs-o-up"></i> {{ c.like || 0 }}</span>
          <span :class="['state', 'state-' + (c.state ?? 0)]">
            {{ stateText(c.state) }}
          </span>
          <el-button size="small" type="primary" plain @click="goArticle(c.articleId, c.uid)">
            <i class="fa fa-external-link"></i>&nbsp;查看
          </el-button>
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
import { getListApi } from '@/api/comment/comment'
import { formatDate } from '@/utils/dateFormat'

const store = useStore()
const router = useRouter()

const currentUser = computed(() => {
  const info = store.getters.getInfo || {}
  return info.username || info.login_name || ''
})

const list = ref<any[]>([])
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const loading = ref(false)

const cleanContent = (str: string | undefined): string => {
  if (!str) return ''
  // 允许 undraw-ui 表情图片（img emoji），去掉脚本/样式
  return str
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
}

const stateText = (state: number | undefined) => {
  switch (state) {
    case 1: return '已通过'
    case 2: return '已拒绝'
    default: return '待审核'
  }
}

const load = async () => {
  if (!currentUser.value) return
  loading.value = true
  try {
    const res = await getListApi({
      username: currentUser.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    if (res && res.code === 200 && res.data) {
      const data = res.data
      // CommentPage: { commentVo2, pageNum, pageSize, total }
      list.value = data.commentVo2 || data.list || data.records || []
      total.value = data.total || list.value.length
    }
  } finally {
    loading.value = false
  }
}

const onPageChange = (page: number) => {
  pageNum.value = page
  load()
}

const goArticle = (articleId: number | undefined, commentUid?: number) => {
  if (!articleId) return
  const query: any = { id: String(articleId) }
  if (commentUid) query.comment = String(commentUid)
  const routeData = router.resolve({ name: 'detail', query })
  window.open(routeData.href, '_blank')
}

onMounted(load)
</script>

<style scoped lang="scss">
.my-comments { padding: 4px 0 20px; }

.page-header { margin-bottom: 16px; }
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

.comment-list { list-style: none; padding: 0; margin: 0; }
.comment-item {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 12px;
  transition: box-shadow .2s ease;
}
.comment-item:hover { box-shadow: 0 4px 14px rgba(0,0,0,.06); }

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.article-title {
  color: #409eff;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
}
.article-title:hover { text-decoration: underline; }
.article-title i { margin-right: 6px; }

.time {
  color: #909399;
  font-size: 12px;
}
.time i { margin-right: 4px; }

.content {
  color: #303133;
  font-size: 14px;
  line-height: 1.7;
  background: #fafafa;
  padding: 10px 14px;
  border-radius: 6px;
  word-break: break-all;
  :deep(img) { max-height: 24px; vertical-align: middle; }
}

.foot {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  font-size: 12px;
  color: #909399;
}
.likes i { margin-right: 4px; }
.state {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
}
.state-0 { color: #e6a23c; background: #fdf6ec; }
.state-1 { color: #67c23a; background: #f0f9eb; }
.state-2 { color: #f56c6c; background: #fef0f0; }

.foot :deep(.el-button) { margin-left: auto; }

.pager { margin-top: 20px; text-align: center; }
</style>
