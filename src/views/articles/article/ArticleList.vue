<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParam" label-width="80px" :inline="true">
      <el-form-item>
        <el-input placeholder="请输入文章标题" v-model="listParam.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
        <router-link style=" margin-left: 8px; color: white;text-decoration: none;" to="/admin/article-edit">
        <el-button type="primary" :icon="Plus">
          新增
        </el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
        :height="tableHeight"
        :data="articleTable.list"
        border stripe>
      <el-table-column label="序号" align="center" width="70">
        <template #default="scope">
          {{ (listParam.pageNum - 1) * listParam.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="article.title" label="文章标题" min-width="220" show-overflow-tooltip></el-table-column>
      <el-table-column prop="article.cover" label="缩略图" align="center" width="120">
        <template #default="scope">
          <el-image v-if="scope.row.article.cover" style="width: 80px; height: 50px; border-radius:4px" fit="cover" :src="scope.row.article.cover"/>
          <span v-else style="color:#c0c4cc">无</span>
        </template>
      </el-table-column>
      <el-table-column prop="article.author" label="作者" align="center" width="110"></el-table-column>

      <el-table-column label="文章分类" align="center" min-width="160">
        <template #default="scope">
          <div class="flex flex-wrap gap-2" style="justify-content:center">
            <el-tag
                v-for="item in scope.row.categories"
                :key="item.name"
                :type="item.type"
                effect="light"
                round
            >
              {{ item.name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章标签" align="center" min-width="160">
        <template #default="scope">
          <div class="flex flex-wrap gap-2" style="justify-content:center">
            <el-tag
                v-for="item in scope.row.tags"
                :key="item.name"
                :type="item.type"
                effect="light"
                round
            >
              {{ item.name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="editBtn(scope.row.article.id)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteBtn(scope.row.article.id)">删除</el-button>
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
        :total="articleTable.total"
    ></el-pagination>
  </el-main>
</template>
<script setup lang='ts'>
import {nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import useArticleTable from "@/composables/article/useArticleTable";
import useArticle from "@/composables/article/useArticle";

import { ref } from 'vue'

//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getArticleList, articleTable, sizeChange, currentChange, searchBtn, resetBtn} = useArticleTable();
//新增，编辑，删除，保存，分配权限
const {editBtn, deleteBtn, save} = useArticle(getArticleList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang='scss'>
</style>
