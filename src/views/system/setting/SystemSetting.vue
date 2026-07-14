<template>
  <div style="margin-top: 15px">
    <el-card class="box-card">
      <div class="clearfix">
        <span style="font-weight:600">网站设置</span>
        <el-button link style="float: right; padding: 3px 0" @click="onSubmit" type="primary">保存</el-button>
      </div>
      <div class="text item">
        <el-form :model="config" label-width="120px">
          <el-divider content-position="center">网站基础设置</el-divider>
          <el-form-item label="网站名称">
            <el-input v-model="config.title" />
          </el-form-item>
          <el-form-item label="网站关键字">
            <el-input v-model="config.keyword" />
          </el-form-item>
          <el-form-item label="网站描述">
            <el-input v-model="config.description" type="textarea" />
          </el-form-item>
          <el-form-item label="网站logo">
            <el-input v-model="config.logo" />
          </el-form-item>
          <el-form-item label="网站图标">
            <el-input v-model="config.favicon" />
          </el-form-item>

          <el-divider content-position="center">网站广告</el-divider>
          <el-form-item label="首页公告">
            <el-input v-model="config.advisory" />
          </el-form-item>

          <el-divider content-position="center">手机版底部导航</el-divider>
          <el-form-item label="启用手机导航">
            <el-switch v-model="config.mobileNavEnable" />
          </el-form-item>
          <template v-if="config.mobileNavEnable">
            <div style="margin-bottom:12px;text-align:right">
              <el-button type="primary" size="small" :icon="Plus" @click="addNav">新增导航项</el-button>
            </div>
            <div v-for="(item, idx) in config.mobileNavs" :key="idx"
                 style="display:flex;gap:10px;align-items:center;margin-bottom:10px;padding:12px;background:#f5f7fa;border-radius:6px">
              <el-input v-model="item.icon" placeholder="图标类名 如 fa fa-home" style="width:200px">
                <template #prepend><i :class="item.icon"></i></template>
              </el-input>
              <el-input v-model="item.title" placeholder="名称" style="width:140px" />
              <el-input v-model="item.link" placeholder="链接 如 /index" style="flex:1" />
              <el-button type="danger" :icon="Delete" circle size="small" @click="removeNav(idx)" />
            </div>
            <el-empty v-if="!config.mobileNavs || !config.mobileNavs.length" description="暂无导航项，点击右上角新增" :image-size="60" />
          </template>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import useSystem from "@/composables/system/useSystem";
import { Plus, Delete } from '@element-plus/icons-vue'

const { config, writeConfig } = useSystem();

// 保证字段存在
if (config.mobileNavEnable === undefined) config.mobileNavEnable = false
if (!config.mobileNavs) config.mobileNavs = []

const addNav = () => {
  if (!config.mobileNavs) config.mobileNavs = []
  config.mobileNavs.push({ icon: 'fa fa-home', title: '', link: '' })
}
const removeNav = (idx: number) => {
  config.mobileNavs.splice(idx, 1)
}

const onSubmit = () => {
  writeConfig(config)
}
</script>
<style scoped lang='scss'>
</style>
