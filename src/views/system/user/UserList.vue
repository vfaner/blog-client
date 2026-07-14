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
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="userTable.list" border stripe>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="loginName" label="登录昵称"></el-table-column>
      <el-table-column label="是否锁定" align="center">
        <template #default="scope">
          <p :style="{'color':scope.row.isAccountNonLocked?'red':'green'}" v-text="scope.row.isAccountNonLocked?'锁定':'未锁定'"></p>
        </template>
      </el-table-column>
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
        :total="userTable.total"
    />
  </el-main>
  <!-- 新增、编辑 -->
  <AddUser ref="addUserRef" @save="save"></AddUser>
  <!--  分配权限弹窗-->
<!--  <AssignMenu ref="assignMenuRef"></AssignMenu>-->
</template>
<script setup lang="ts">
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import useUserTable from '@/composables/user/useUserTable';
import useUser from "@/composables/user/useUser";
import AddUser from "./AddUser.vue"
// import AssignMenu from "@/views/system/user/AssignMenu.vue";
//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getUserList, userTable, sizeChange, currentChange, searchBtn, resetBtn} = useUserTable();
//新增，编辑，删除，保存，分配权限
const {addBtn, editBtn, deleteBtn, save, assignPermission, addUserRef, assignMenuRef} = useUser(getUserList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang="scss">
</style>
