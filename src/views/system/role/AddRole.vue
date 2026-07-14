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
      <el-form ref="addRoleForm"
               :model="addModel"
               label-width="80px"
               :rules="rules"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="code" label="角色编码">
              <el-input v-model="addModel.code" placeholder="请输入角色编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="角色名称">
              <el-input v-model="addModel.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="description" label="角色描述">
              <el-input rows="4" type="textarea" v-model="addModel.description" placeholder="请输入角色描述" />
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
import useAddRole from '@/composables/role/useAddRole';
//声明事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {confirm, show, addRoleForm, rules, addModel} = useAddRole(dialog, onClose, onShow, emit)
//暴露方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
