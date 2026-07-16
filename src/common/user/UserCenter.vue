<template>
  <div class="user-center">
    <!-- 顶部三张快捷入口 -->
    <div class="quick-cards">
      <div class="quick-card card-info" @click="goto('/user/edit')">
        <div class="qc-body">
          <div class="qc-icon"><i class="fa fa-cogs"></i></div>
          <div class="qc-title">个人资料</div>
        </div>
        <div class="qc-footer">
          <span>修改资料</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="quick-card card-comment" @click="goto('/user/my_comments')">
        <div class="qc-body">
          <div class="qc-icon"><i class="fa fa-comments"></i></div>
          <div class="qc-title">我的评论</div>
        </div>
        <div class="qc-footer">
          <span>查看详情</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="quick-card card-article" @click="goto('/user/my_articles')">
        <div class="qc-body">
          <div class="qc-icon"><i class="fa fa-pencil-square-o"></i></div>
          <div class="qc-title">我的文章</div>
        </div>
        <div class="qc-footer">
          <span>查看详情</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </div>

    <!-- 基本信息卡片 -->
    <section class="profile-card">
      <header class="profile-header">
        <img :src="user.avatar || avatar" class="profile-avatar" alt="头像">
        <div class="profile-heading">
          <div class="profile-name">
            {{ displayName }}
            <span class="vip-tag">未开通</span>
          </div>
          <div class="profile-role">
            <i class="fa fa-user-o"></i>
            {{ roleText }}
          </div>
        </div>
      </header>

      <h3 class="section-title">基本信息</h3>
      <dl class="info-list">
        <div class="info-item">
          <dt>用户 ID</dt>
          <dd>{{ user.id ?? '-' }}</dd>
        </div>
        <div class="info-item">
          <dt>登录账户</dt>
          <dd>{{ user.username || '-' }}</dd>
        </div>
        <div class="info-item">
          <dt>昵称</dt>
          <dd>{{ user.nickName || user.login_name || '-' }}</dd>
        </div>
        <div class="info-item">
          <dt>邮箱</dt>
          <dd>{{ user.email || '未绑定' }}</dd>
        </div>
      </dl>

      <div class="profile-actions">
        <el-button type="primary" @click="goto('/user/edit')">
          <i class="fa fa-edit"></i>&nbsp;修改资料
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import { UserInfo } from "@/api/user/userModel";
import avatar from '@/assets/avatar.png'
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed<UserInfo>(() => store.getters.getInfo || ({} as UserInfo))

const displayName = computed(() =>
  user.value.nickName || user.value.login_name || user.value.username || '匿名用户'
)

const roleText = computed(() => {
  const roles = user.value.roles
  if (Array.isArray(roles) && roles.length) return roles.join(' / ')
  return '普通用户'
})

const goto = (path: string) => router.push(path)
</script>

<style scoped lang="scss">
.user-center {
  padding: 4px 0 24px;
}

/* ===== 顶部三张快捷卡片 ===== */
.quick-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.quick-card {
  border-radius: 10px;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
}
.quick-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,.12);
}
.qc-body {
  padding: 22px 20px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.qc-icon {
  font-size: 44px;
  opacity: .85;
}
.qc-title {
  font-size: 22px;
  font-weight: 600;
}
.qc-footer {
  padding: 10px 20px;
  background: rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
.card-info    { background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%); }
.card-comment { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }
.card-article { background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); }

/* ===== 基本信息卡 ===== */
.profile-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 2px 10px rgba(0,0,0,.03);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid #f0f0f0;
}
.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5f5f5;
  flex-shrink: 0;
}
.profile-heading { line-height: 1.6; }
.profile-name {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 10px;
}
.vip-tag {
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 20px;
  background: #909399;
  color: #fff;
  font-weight: normal;
}
.profile-role {
  font-size: 13px;
  color: #909399;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 22px 0 14px;
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

.info-list {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 24px;
}
.info-item {
  display: grid;
  grid-template-columns: 110px 1fr;
  padding: 10px 0;
  border-bottom: 1px dashed #f2f2f2;
  align-items: center;
}
.info-item dt {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  margin: 0;
}
.info-item dd {
  color: #303133;
  font-size: 14px;
  margin: 0;
  word-break: break-all;
}

.profile-actions {
  margin-top: 20px;
  text-align: right;
}

@media (max-width: 768px) {
  .quick-cards { grid-template-columns: 1fr; }
  .info-list { grid-template-columns: 1fr; }
  .info-item { grid-template-columns: 90px 1fr; }
}
</style>
