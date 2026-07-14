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
      <el-tree
          ref="assignTree"
          :data="assignTreeData.list"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          empty-text="暂无数据"
          :show-checkbox="true"
          :highlight-current="true"
          :default-checked-keys="assignTreeData.assignTreeChecked"
      ></el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAssignMenu from '@/composables/role/useAssignMenu';
//弹框属性
const {dialog, onShow, onClose} = useDialog();

const {confirm, show, assignTreeData, defaultProps, assignTree} = useAssignMenu(dialog, onShow, onClose)

//暴露方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
