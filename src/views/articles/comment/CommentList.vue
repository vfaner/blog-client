<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParam" label-width="80px" :inline="true">
      <el-form-item>
        <el-input placeholder="请输入用户名称" v-model="listParam.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="commentTable.list" border stripe>
      <el-table-column prop="username" label="用户名称" width="140"></el-table-column>
      <el-table-column prop="articleName" label="文章名称" min-width="180" show-overflow-tooltip>
        <template #default="scope">
          <el-link v-if="scope.row.articleId" type="primary" @click="goArticle(scope.row.articleId)">
            {{ scope.row.articleName || '查看文章' }}
          </el-link>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column label="评论内容" min-width="220">
        <template #default="scope">
          {{ cleanContent(scope.row.content) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="评论时间" width="160"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="View" @click="goArticle(scope.row.articleId, scope.row.uid || scope.row.id)">查看</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="remove(scope.row.uid || scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        small
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="listParam.pageNum===0?1:listParam.pageNum"
        :page-sizes="[10, 20, 40, 80, 100]"
        :page-size="listParam.pageSize===0?10:listParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commentTable.total"
    ></el-pagination>
  </el-main>

</template>
<script setup lang='ts'>
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, View} from '@element-plus/icons-vue';
import useCommentList from "@/composables/comment/useCommentList";
import useCommentDel from "@/composables/comment/useCommentDel";

// 跳转到前台文章详情页（新标签页），并定位评论
const goArticle = (articleId: number, commentUid?: number) => {
  if (!articleId) return
  let url = `/article/detail?id=${articleId}`
  if (commentUid) url += `&comment=${commentUid}`
  else url += '#comments'
  window.open(url, '_blank')
}

// 清理评论内容：保留文字和表情标记，去掉 span 等 HTML 标签
const cleanContent = (html: string) => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getCommentList, commentTable, sizeChange, currentChange, searchBtn, resetBtn} = useCommentList();
//新增，编辑，删除，保存，分配权限
const {remove} = useCommentDel(getCommentList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang='scss'>
</style>
