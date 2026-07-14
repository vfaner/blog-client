<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParam" label-width="80px" :inline="true">
      <el-form-item>
        <el-input placeholder="请输入标签名称" v-model="listParam.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tagTable.list" border stripe>
      <el-table-column prop="name" label="标签名称"></el-table-column>
      <el-table-column prop="alias" label="标签别名"></el-table-column>
      <el-table-column prop="description" label="标签描述"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteBtn(scope.row.id)">删除</el-button>
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
        :total="tagTable.total"
    ></el-pagination>
  </el-main>
  <!-- 新增、编辑 -->
  <AddTag ref="addTagRef" @save="save"></AddTag>
</template>
<script setup lang='ts'>
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import AddTag from "./AddTag.vue"
import useTagTable from "@/composables/tag/useTagTable";
import useTag from "@/composables/tag/useTag";
//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getTagList, tagTable, sizeChange, currentChange, searchBtn, resetBtn} = useTagTable();
//新增，编辑，删除，保存，分配权限
const {addBtn, editBtn, deleteBtn, save, addTagRef} = useTag(getTagList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang='scss'>
</style>
