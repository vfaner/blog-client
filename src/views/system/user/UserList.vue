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
      <el-table-column label="头像" width="80" align="center">
        <template #default="scope">
          <el-avatar :size="40" :src="scope.row.avatar || defaultAvatar" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" min-width="120"></el-table-column>
      <el-table-column prop="nickName" label="昵称" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.nickName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="180" align="center">
        <template #default="scope">
          <template v-if="scope.row.roles && scope.row.roles.length">
            <el-tag
              v-for="r in scope.row.roles"
              :key="r"
              :type="roleTagType(r)"
              size="small"
              style="margin: 2px"
            >{{ r }}</el-tag>
          </template>
          <el-tag v-else-if="scope.row.role" :type="roleTagType(scope.row.role)" size="small">
            {{ scope.row.role }}
          </el-tag>
          <span v-else class="empty-hint">未分配</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="180">
        <template #default="scope">
          <span v-if="scope.row.email">{{ scope.row.email }}</span>
          <span v-else class="empty-hint">未绑定</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
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
</template>
<script setup lang="ts">
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit} from '@element-plus/icons-vue';
import useUserTable from '@/composables/user/useUserTable';
import useUser from "@/composables/user/useUser";
import AddUser from "./AddUser.vue"
import defaultAvatar from '@/assets/avatar.png'
//表格高度
const tableHeight = ref(0);
//表格列表
const {listParam, getUserList, userTable, sizeChange, currentChange, searchBtn, resetBtn} = useUserTable();
//新增，编辑，删除，保存
const {addBtn, editBtn, deleteBtn, save, addUserRef} = useUser(getUserList);

const roleTagType = (role: string): 'success' | 'primary' | 'info' | 'warning' | 'danger' => {
  const map: Record<string, 'success' | 'primary' | 'info' | 'warning' | 'danger'> = {
    root: 'danger',
    admin: 'danger',
    author: 'warning',
    view: 'info',
  }
  return map[role] || 'primary'
}

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
<style scoped lang="scss">
.empty-hint {
  color: #c0c4cc;
  font-size: 12px;
}
</style>
