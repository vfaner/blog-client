<template>
  <div class="header-user">
    <el-dropdown trigger="click">
      <div class="user-trigger">
        <img class="user-avatar" :src="user.avatar || avatar" alt="avatar">
        <span class="user-name">{{ user.nickName || user.login_name || user.username }}</span>
        <el-icon class="arrow"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="User" @click="goCenter">个人中心</el-dropdown-item>
          <el-dropdown-item :icon="RefreshRight" @click="resetBtn">还原数据</el-dropdown-item>
          <el-dropdown-item :icon="SwitchButton" divided @click="loginOutBtn">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang='ts'>
import useInstance from '@/hooks/useInstance';
import avatar from '@/assets/avatar.png'
import { ArrowDown, User, RefreshRight, SwitchButton } from '@element-plus/icons-vue'
import { loginOutApi, restoreApi } from '@/api/user/user'
import { getToken, cleanSession } from '@/utils/auth';
import { UserInfo } from "@/api/user/userModel";
import { computed } from "vue";
import { useStore } from "@/store";

const { global } = useInstance();
const store = useStore();
const user: UserInfo = computed(() => store.getters.getInfo)

const goCenter = () => {
  window.location.href = '/user/center'
}

const loginOutBtn = async () => {
  let confirm = await global.$myConfirm('确定退出登录吗？')
  if (confirm) {
    let res = await loginOutApi({ token: getToken() })
    if (res && res.code == 200) {
      global.$message({ message: res.msg, type: 'success' })
      cleanSession();
      window.location.href = "/login";
    }
  }
}

const resetBtn = async () => {
  let confirm = await global.$myConfirm('确定还原数据吗？')
  if (confirm) {
    let res = await restoreApi(true);
    if (res.code == 200) {
      global.$message.success(res.msg);
    }
  }
}
</script>

<style scoped lang='scss'>
.header-user {
  display: flex;
  align-items: center;
  height: 100%;
}
.user-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  &:hover {
    background: #f0f2f5;
  }
  .user-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .arrow {
    font-size: 12px;
    color: #909399;
  }
}
</style>
