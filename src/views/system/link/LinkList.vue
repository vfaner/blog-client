<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParam" label-width="80px" :inline="true">
      <el-form-item>
        <el-input placeholder="请输入友联名称" v-model="listParam.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="linkTable.list" border stripe>
      <el-table-column prop="name" label="友联名称"></el-table-column>
      <el-table-column prop="link" label="友联链接"></el-table-column>
      <el-table-column prop="description" label="友联描述"></el-table-column>

      <el-table-column label="是否展示">
        <template #default="scope">
          <el-switch
              v-model="scope.row.enable"
              class="mb-2"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="显示"
              inactive-text="关闭"
              @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
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
        :total="linkTable.total"
    ></el-pagination>
  </el-main>
  <!-- 新增、编辑 -->
  <AddLink ref="addLinkRef" @save="save"></AddLink>
</template>
<script setup lang='ts'>
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import useLink from "@/composables/link/useLink";
import useLinkTable from "@/composables/link/useLinkTable";
import AddLink from "@/views/system/link/AddLink.vue";
//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getLinkList, linkTable, sizeChange, currentChange, searchBtn, resetBtn} = useLinkTable();
//新增，编辑，删除，保存，分配权限
const {addBtn, editBtn, deleteBtn, save, addLinkRef,changeStatus} = useLink(getLinkList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang='scss'>
</style>
