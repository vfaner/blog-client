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
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="addModel.username" placeholder="请输入用户编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="loginName" label="昵称">
              <el-input v-model="addModel.loginName" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="password" label="登录密码">
              <el-input :disabled="addModel.type==='1'" type="password" v-model="addModel.password" placeholder="请输入密码" show-password />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAddUser from '@/composables/user/useAddUser';
//声明事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {confirm, show, addUserForm, rules, addModel} = useAddUser(dialog, onClose, onShow, emit)
//暴露方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
