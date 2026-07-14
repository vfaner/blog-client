<template>
  <SysDialog
      :title="dialog.title"
      :width="dialog.width"
      :height="dialog.height"
      :visible="dialog.visible"
      @onConfirm="confirm"
      @onClose="onClose"
  >
    <template v-slot:content>
      <el-form ref="addMenuForm"
               :model="addMenuModel"
               :rules="rules"
               label-width="80px"
      >
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="type" label="菜单类型">
              <el-radio-group v-model="addMenuModel.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
<!--                <el-radio :label="'2'">按钮</el-radio>-->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="parentName" label="上级菜单">
              <el-input v-model="addMenuModel.id" type="hidden"></el-input>
              <el-input @click="selectParent" readonly v-model="addMenuModel.parentName"
                        placeholder="请选择上级菜单"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="label" label="菜单名称">
              <el-input v-model="addMenuModel.label" placeholder="请填写菜单名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="addMenuModel.type !== '2'" :span="12" :offset="0">
            <el-form-item label="菜单图标">
              <el-input v-model="addMenuModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="addMenuModel.type === '1'" :span="12" :offset="0">
            <el-form-item prop="name" label="路由名称">
              <el-input v-model="addMenuModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="addMenuModel.type === '1'" :span="12" :offset="0">
            <el-form-item prop="path" label="路由地址">
              <el-input v-model="addMenuModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="addMenuModel.type === '1'" :span="12" :offset="0">
            <el-form-item prop="url" label="组件路径">
              <el-input v-model="addMenuModel.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="code" label="权限字段">
              <el-input v-model="addMenuModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单序号">
              <el-input v-model="addMenuModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <!--  上级菜单弹窗-->
  <MenuParent ref="parentRef" @select="select"></MenuParent>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAddMenu from '@/composables/nav/useAddMenu';
import MenuParent from "@/views/system/menu/MenuParent.vue";
import useSelectParent from "@/composables/nav/useSelectParent";
//注册事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {confirm, show, addMenuModel, rules, select} = useAddMenu(dialog, onClose, onShow, emit)
//上级部门
const {parentRef, selectParent} = useSelectParent()
//暴露出去
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
</style>
