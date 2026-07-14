<template>
    <template v-for="menu of menuList" :key="menu?.path">
        <el-sub-menu v-if="menu?.children && menu.children.length > 0" :index="menu?.path">
            <template #title>
                <Icon class="icons" :icon="menu?.meta?.icon" />
                <span>{{ menu?.meta?.title }}</span>
            </template>
            <menu-item :menuList="menu?.children" />
        </el-sub-menu>
        <el-menu-item style="color: #f4f4f5" v-else :index="menu?.path">
            <Icon class="icons" :icon="menu?.meta?.icon" />
            <span>{{ menu?.meta?.title }}</span>
        </el-menu-item>
    </template>

</template>

<script setup lang="ts">

//接收父组件MenuBar传递过来的值
defineProps(['menuList'])
</script>

<style lang="scss" scoped>
.icons{
  width: 24px;
  height: 18px;
}
</style>
