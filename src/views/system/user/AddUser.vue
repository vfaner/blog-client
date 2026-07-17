<template>
  <SysDialog
      :title="dialog.title"
      :width="dialog.width"
      :visible="dialog.visible"
      :height="dialog.height"
      @onClose="onClose"
      @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-form ref="addUserForm"
               :model="addModel"
               label-width="80px"
               :rules="rules"
               class="user-form"
      >
        <!-- 头像预览 + 头像 URL -->
        <el-form-item label="头像">
          <div class="avatar-row">
            <el-avatar :size="60" :src="addModel.avatar || defaultAvatar" />
            <el-input
              v-model="addModel.avatar"
              placeholder="头像图片 URL（可留空）"
              clearable
            />
          </div>
        </el-form-item>
        <div class="form-grid">
          <el-form-item prop="username" label="用户名">
            <el-input
              v-model="addModel.username"
              placeholder="请输入登录账号"
              :disabled="addModel.type === '1'"
            />
          </el-form-item>
          <el-form-item prop="nickName" label="昵称">
            <el-input v-model="addModel.nickName" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="addModel.email" placeholder="可选" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="addModel.roleIds"
              multiple
              collapse-tags
              collapse-tags-tooltip
              placeholder="请选择角色"
              style="width: 100%"
            >
              <el-option
                v-for="r in roleOptions"
                :key="r.id"
                :label="r.name"
                :value="r.id"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="addModel.password"
            :placeholder="addModel.type === '1' ? '留空则不修改' : '请输入密码'"
            show-password
            style="max-width: 320px"
          />
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAddUser from '@/composables/user/useAddUser';
import defaultAvatar from '@/assets/avatar.png';
//声明事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {confirm, show, addUserForm, rules, addModel, roleOptions} = useAddUser(dialog, onClose, onShow, emit)
//暴露方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
.user-form {
  padding: 4px 8px;
}
.avatar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
}
.avatar-row :deep(.el-input) {
  flex: 1;
  min-width: 0;
}
/* 用 grid 代替 el-row/el-col 的负边距布局，杜绝横向溢出 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
}
@media (max-width: 720px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>
