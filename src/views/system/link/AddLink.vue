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
      <el-form ref="addLinkForm"
               :model="addModel"
               label-width="80px"
               :rules="rules"
               size="large"
      >

        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="友联名称">
              <el-input v-model="addModel.name" placeholder="请输入友联名称" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="友联链接">
              <el-input v-model="addModel.link"  placeholder="请输入友联链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="description" label="友联描述">
              <el-input type="textarea" v-model="addModel.description"  placeholder="请输入友联描述" />
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
import useAddLink from "@/composables/link/useAddLink";
//声明事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {confirm, show, addLinkForm, rules, addModel} = useAddLink(dialog, onClose, onShow, emit)
//暴露方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
