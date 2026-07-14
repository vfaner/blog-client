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
      <el-form ref="addTagForm"
               :model="addModel"
               label-width="80px"
               :rules="rules"
               size="large"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="标签名称">
              <el-input v-model="addModel.name" placeholder="请输入标签名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="标签别名">
              <el-input v-model="addModel.alias" placeholder="请输入标签别名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="description" label="标签描述">
              <el-input type="textarea" v-model="addModel.description" placeholder="请输入标签描述" />
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
import useAddTag from '@/composables/tag/useAddTag'
//声明事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {confirm, show, addTagForm, rules, addModel} = useAddTag(dialog, onClose, onShow, emit)
//暴露方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
