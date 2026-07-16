<template>
  <div class="edit-info">
    <div class="page-header">
      <h3 class="section-title">修改资料</h3>
    </div>

    <div class="edit-card">
      <!-- 头像预览 -->
      <div class="avatar-block">
        <img :src="form.avatar || defaultAvatar" class="preview-avatar" alt="头像预览">
        <div class="avatar-tip">头像预览</div>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="90px"
        label-position="right"
        class="edit-form"
        @submit.prevent
      >
        <el-form-item label="用户 ID">
          <el-input v-model="form.id" disabled />
        </el-form-item>

        <el-form-item label="登录账号">
          <el-input v-model="form.username" disabled>
            <template #prefix><i class="fa fa-user"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item label="头像地址" prop="avatar">
          <el-input v-model="form.avatar" placeholder="请输入头像图片 URL">
            <template #prefix><i class="fa fa-image"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="loginName">
          <el-input v-model="form.loginName" placeholder="展示在评论、文章列表处">
            <template #prefix><i class="fa fa-address-card-o"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="用于接收通知（可选）">
            <template #prefix><i class="fa fa-envelope-o"></i></template>
          </el-input>
        </el-form-item>

        <el-divider content-position="left">修改密码（可选）</el-divider>

        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="留空则不修改"
          >
            <template #prefix><i class="fa fa-lock"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="repeat">
          <el-input
            v-model="repeat"
            type="password"
            show-password
            placeholder="再次输入新密码"
          >
            <template #prefix><i class="fa fa-lock"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" @click="submit" :loading="submitting">
            <i class="fa fa-check"></i>&nbsp;保存修改
          </el-button>
          <el-button size="large" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import defaultAvatar from '@/assets/avatar.png'
import { useStore } from '@/store'
import { UserInfo, EditUserModel } from '@/api/user/userModel'
import useUser from '@/composables/user/useUser'

const store = useStore()

const currentUser = computed<UserInfo>(() => store.getters.getInfo || ({} as UserInfo))

const form = reactive<EditUserModel>({
  id: '',
  username: '',
  loginName: '',
  avatar: '',
  email: '',
  password: ''
})
const repeat = ref('')

// 用户数据到达后回填表单
watchEffect(() => {
  const u = currentUser.value
  if (!u) return
  form.id = u.id ?? ''
  form.username = u.username || ''
  form.loginName = (u as any).nickName || u.login_name || ''
  form.avatar = u.avatar || ''
  form.email = u.email || ''
})

const rules: FormRules = {
  loginName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度 2-20 位', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  avatar: [
    { max: 500, message: '头像地址过长', trigger: 'blur' }
  ],
  password: [
    { min: 5, max: 20, message: '密码长度 5-20 位', trigger: 'blur' }
  ]
}

const formRef = ref<FormInstance>()
const submitting = ref(false)

// 兼容 useUser({getUserList})，这里传空 refresh
const { modifyUser } = useUser(() => {})

const submit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  if (form.password && form.password !== repeat.value) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  submitting.value = true
  try {
    const payload: EditUserModel = {
      id: form.id,
      username: form.username,
      loginName: form.loginName,
      avatar: form.avatar,
      email: form.email
    }
    if (form.password) payload.password = form.password
    await modifyUser(payload)
  } finally {
    submitting.value = false
  }
}

const reset = () => {
  const u = currentUser.value
  form.loginName = (u as any).nickName || u.login_name || ''
  form.avatar = u.avatar || ''
  form.email = u.email || ''
  form.password = ''
  repeat.value = ''
  formRef.value?.clearValidate()
}
</script>

<style scoped lang="scss">
.edit-info { padding: 4px 0 24px; }

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

.edit-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  box-shadow: 0 2px 10px rgba(0,0,0,.03);
}

.avatar-block {
  text-align: center;
  padding-top: 6px;
}
.preview-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f5f5f5;
  box-shadow: 0 4px 14px rgba(0,0,0,.08);
}
.avatar-tip {
  margin-top: 12px;
  color: #909399;
  font-size: 13px;
}

.edit-form {
  max-width: 560px;
}
.edit-form :deep(.el-form-item) {
  margin-bottom: 22px;
}
.edit-form :deep(.el-input__wrapper) {
  padding: 4px 12px;
  border-radius: 6px;
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  transition: box-shadow .2s ease;
}
.edit-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}
.edit-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #C38CFF inset;
}
.edit-form :deep(.el-input.is-disabled .el-input__wrapper) {
  background: #fafafa;
}
.edit-form :deep(.el-input__prefix .fa) {
  color: #909399;
  margin-right: 4px;
}

.edit-form :deep(.el-divider__text) {
  color: #909399;
  font-size: 13px;
  background: #fff;
}

@media (max-width: 768px) {
  .edit-card {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  .avatar-block { padding-bottom: 8px; }
}
</style>
