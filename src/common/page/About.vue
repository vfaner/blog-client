<template>
  <div style="margin-top: 10px;margin-bottom: 10px">
    <el-card class="box-card">
      <template #header>
        <div class="card-header" style="text-align: center">
          <span style="font-size: 29px">关于本系统</span>
        </div>
      </template>
      <div class="text item" style="text-align: center">
        <span style="font-family: Arial,sans-serif;">简约美观而不失大雅，体积小，可快速上手，搭建一个属于
        你自己的博客~~~~~~~~</span>
      </div>
    </el-card>
  </div>
  <div style="margin-bottom: 10px">
    <el-card class="box-card">
      <template #header>
        <div class="card-header" style="text-align: center">
          <span style="font-size: 29px">技术栈</span>
        </div>
      </template>
      <div class="text item" style="text-align: center">
        <div class="flex flex-wrap gap-2 my-2">
          <span class="tag-group__title m-1 line-height-2">后端：&nbsp;&nbsp;&nbsp;</span>
          <el-tag
              v-for="item in server"
              :key="item.label"
              :type="item.type"
              class="mx-1"
              effect="dark"
              round
              style="margin-right: 10px"
          >
            {{ item.label }}
          </el-tag>
          <span class="tag-group__title m-1 line-height-2">前端：&nbsp;&nbsp;&nbsp;</span>
          <el-tag
              v-for="(item,index) in con"
              :key="item.label"
              :type="item.type"
              class="mx-1"
              effect="dark"
              round
              style="margin-right: 10px"
          >
            <span v-text="item.label"></span>
          </el-tag>
        </div>
      </div>
    </el-card>
  </div>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header" style="text-align: center">
          <span style="font-size: 29px">开发历史</span>
        </div>
      </template>
      <div class="text item">
        <el-timeline>
          <el-timeline-item timestamp="2023/01/15" placement="top">
            <el-card>
              <h4>博客前端用户中心，数据对接</h4>
              <p>rgh committed 2023/01/15</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/12/30" placement="top">
            <el-card>
              <h4>博客前端界面改造，套皮</h4>
              <p>rgh committed 2022/12/30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/10/28" placement="top">
            <el-card>
              <h4>Update blog-client And blog-server</h4>
              <p>rgh committed 2022/10/28</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022/10/19" placement="top">
            <el-card>
              <h4>Add Branch And Start Rectification items</h4>
              <p>rgh committed 2022/10/19</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2021/11/25" placement="top">
            <el-card>
              <h4>Initial commit</h4>
              <p>rgh committed 2021/11/25</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import type { TagProps } from 'element-plus'
import {gt} from 'lodash';
type Item = { type: TagProps['type']; label: string }

const con = ref<Array<Item>>([
  { type: 'danger', label: 'Vue3' },
  { type: 'warning', label: 'TypeScript' },
  { type: 'success', label: 'Vuex' },
  { type: 'info', label: 'Axios' },
  { type: 'danger', label: 'Echarts' },
])
const server = ref<Array<Item>>([
  { type: 'primary', label: 'SpringBoot' },
  { type: 'success', label: 'Mysql' },
  { type: 'info', label: 'JPA' },
])
</script>
<style scoped lang="scss">
</style>
