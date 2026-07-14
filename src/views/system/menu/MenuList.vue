<template style='padding:0px 20px;'>
  <el-main>
    <el-card class="box-card">
     <div>
       <!-- 新增按钮 -->
       <el-form :inline="true" size="small">
         <el-form-item>
           <el-button type="primary" @click="addBtn" :icon="Plus">新增</el-button>
         </el-form-item>
       </el-form>
       <!-- 表格 -->
       <el-table
           :height="tableHeight"
           :data="menuTable.list"
           style="width: 100%;"
           row-key="id"
           border
           default-expand-all
           :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
       >
         <el-table-column prop="label" label="菜单名称"/>
         <el-table-column prop="type" width="70" label="类型" align="center">
           <template #default="scope">
             <el-tag v-if="scope.row.type == '0'">目录</el-tag>
             <el-tag v-if="scope.row.type == '1'" type="success">菜单</el-tag>
             <el-tag v-if="scope.row.type == '2'" type="danger">按钮</el-tag>
           </template>
         </el-table-column>
         <el-table-column prop="icon" width="55" align="center" label="图标">
           <template #default="scope">
             <Icon v-if="scope.row.icon!=='el-icon-document'
            &&scope.row.icon!==''&&scope.row.icon!==undefined" class="icons" :icon="scope.row.icon"></Icon>

           </template>
         </el-table-column>
         <el-table-column prop="name"  label="路由名称" style="text-align: center"/>
         <el-table-column prop="path" label="路由地址"/>
         <el-table-column prop="url" label="组件路径"/>
         <el-table-column prop="code" label="权限字段"/>
         <el-table-column label="首页显示" align="center">
           <template #default="scope">
             <el-switch
                 v-model="scope.row.enable"
                 class="mb-2"
                 @change="changeStatus(scope.row)"
             />
           </template>
         </el-table-column>
         <el-table-column label="操作" width="210" align="center">
           <template #default="scope">
             <el-button type="primary" size="small" @click="editBtn(scope.row)" :icon="Edit">编辑</el-button>
             <el-button type="danger" size="small" @click="deleteBtn(scope.row.id)" :icon="Close">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
    </el-card>
  </el-main>
  <!--新增，编辑弹窗 -->
  <AddMenu ref="addMenuRef" @save="save"></AddMenu>
</template>
<script setup lang="ts">
import {Plus, Edit, Close} from '@element-plus/icons-vue';
import {ref, onMounted, nextTick} from 'vue';
import useMenuTable from '@/composables/nav/useMenuTable';
import useMenu from '@/composables/nav/useMenu';
import AddMenu from "@/views/system/menu/AddMenu.vue";
//表格的高度
const tableHeight = ref(0)
//表格数据获取
const {menuTable, getMenuTable} = useMenuTable()

//表格的操作
const {addBtn, editBtn, deleteBtn, save,changeStatus, addMenuRef} = useMenu(getMenuTable)

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 200
  })
})
</script>
<style scoped lang="scss">
.icons {
  width: 24px;
  height: 18px;
  margin-right: 5px;
}
</style>
