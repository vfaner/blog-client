<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParam" label-width="80px" :inline="true">
      <el-form-item>
        <el-input placeholder="请输入角色名称" v-model="listParam.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="roleTable.list" border stripe>
      <el-table-column prop="code" label="角色编码"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" :icon="Setting" @click="assignPermission(scope.row.id,scope.row.name)">
            分配权限
          </el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="listParam.pageNum===0?1:listParam.pageNum"
        :page-sizes="[10, 20, 40, 80, 100]"
        :page-size="listParam.pageSize===0?10:listParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleTable.total"
    ></el-pagination>
  </el-main>
  <!-- 新增、编辑 -->
  <AddRole ref="addRoleRef" @save="save"></AddRole>
  <!--  分配权限弹窗-->
  <AssignMenu ref="assignMenuRef"></AssignMenu>
</template>
<script setup lang="ts">
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import useRoleTable from '@/composables/role/useRoleTable';
import useRole from "@/composables/role/useRole";
import AddRole from "./AddRole.vue"
import AssignMenu from "@/views/system/Role/AssignMenu.vue";
//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getRoleList, roleTable, sizeChange, currentChange, searchBtn, resetBtn} = useRoleTable();
//新增，编辑，删除，保存，分配权限
const {addBtn, editBtn, deleteBtn, save, assignPermission, addRoleRef, assignMenuRef} = useRole(getRoleList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang="scss">
</style>
