<template>
  <MenuLogo class="layout-logo"/>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      unique-opened
      router
  >
    <MenuItem :menuList="menuList"/>
  </el-menu>
</template>

<script setup lang="ts">
//setup语法糖中，引入的组件可以直接使用，无需再通过components进行注册
import MenuItem from "@/layout/menu/MenuItem.vue";
import {reactive, computed, onMounted} from 'vue';
import MenuLogo from "@/layout/menu/MenuLogo.vue";
import {useRoute} from "vue-router";
import {useStore} from "@/store";

//当前路由
const route=useRoute()
const activeIndex=computed(()=>{
  const {path}=route;
  return path;
})
//获取展开属性值
const store = useStore();
//控制菜单展开和关闭
const isCollapse = computed(()=>{
  return store.getters['getCollapse']
});
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
//菜单数据
const menuList = computed(() => {

  return store.getters.getMenuList
})
onMounted(()=>{
    console.log("MenuBar")
    console.log(menuList)
})
//菜单数据
// let menuList = reactive([
//   {
//     path: '/dashboard',
//     component: "Layout",
//     meta: {
//       title: "首页",
//       icon: "HomeFilled",
//       roles: ["sys:manage"]
//     },
//     children: []
//   },
//   {
//     path: "/system",
//     component: "Layout",
//     alwaysShow: true,
//     name: "system",
//     meta: {
//       title: "系统管理",
//       icon: "Menu",
//       roles: ["sys:manage"],
//       parentId: 0,
//     },
//     children: [
//       {
//         path: "/setting",
//         component: "/system/setting/setting",
//         alwaysShow: false,
//         name: "setting",
//         meta: {
//           title: "机构管理",
//           icon: "Document",
//           roles: ["sys:dept"],
//           parentId: 17,
//         },
//       },
//       {
//         path: "/userList",
//         component: "/system/User/UserList",
//         alwaysShow: false,
//         name: "userList",
//         meta: {
//           title: "用户管理",
//           icon: "Avatar",
//           roles: ["sys:user"],
//           parentId: 17,
//         },
//       },
//       {
//         path: "/roleList",
//         component: "/system/Role/RoleList",
//         alwaysShow: false,
//         name: "roleList",
//         meta: {
//           title: "角色管理",
//           icon: "Grape",
//           roles: ["sys:role"],
//           parentId: 17,
//         },
//       },
//       {
//         path: "/menuList",
//         component: "/system/Menu/MenuList",
//         alwaysShow: false,
//         name: "menuList",
//         meta: {
//           title: "权限管理",
//           icon: "Document",
//           roles: ["sys:menu"],
//           parentId: 17,
//         },
//       },
//     ],
//   },
//   {
//     path: "/articles",
//     component: "Layout",
//     alwaysShow: true,
//     name: "articles",
//     meta: {
//       title: "文章管理",
//       icon: "Burger",
//       roles: ["sys:articles"],
//       parentId: 0,
//     },
//     children: [
//       {
//         path: "/category",
//         component: "/articles/category/CategoryList",
//         alwaysShow: false,
//         name: "category",
//         meta: {
//           title: "文章分类",
//           icon: "Star",
//           roles: ["sys:category"],
//           parentId: 34,
//         },
//       },
//       {
//         path: "/tag",
//         component: "/articles/tag/TagList",
//         alwaysShow: false,
//         name: "tag",
//         meta: {
//           title: "标签分类",
//           icon: "Star",
//           roles: ["sys:tag"],
//           parentId: 34,
//         },
//       },
//     ],
//   },
//   {
//     path: "/systemConfig",
//     component: "Layout",
//     alwaysShow: true,
//     name: "systemConfig",
//     meta: {
//       title: "系统工具",
//       icon: "Grid",
//       roles: ["sys:systemConfig"],
//       parentId: 0,
//     },
//     children: [
//       {
//         path: "/document",
//         component: "/system/config/systemDocument",
//         alwaysShow: false,
//         name: "http://42.193.158.170:8089/swagger-ui/index.html",
//         meta: {
//           title: "接口文档",
//           icon: "Document",
//           roles: ["sys:document"],
//           parentId: 42,
//         },
//       },
//     ],
//   },
// ]);

</script>

<style lang="scss" scoped>
@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
.layout-logo {
  animation: logoAnimation 1s ease-out;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title){
  color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item){
  color: #bfcbd9;
}
/* 菜单点中文字的颜色 */

:deep(.el-menu-item.is-active){
  color: #409eff !important;
}
/* 当前打开菜单的所有子菜单颜色 */

:deep(.is-opened .el-menu-item){
  background-color: #1f2d3d !important;
}
/* 鼠标移动菜单的颜色 */

:deep(.el-menu-item:hover){
  background-color: #001528 !important;
}
</style>
