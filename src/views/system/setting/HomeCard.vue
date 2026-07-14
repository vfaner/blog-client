<template>
  <el-main>
    <div style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">
      <h3 style="margin:0">首页卡片配置</h3>
      <el-button type="primary" :icon="Plus" @click="addCard">新增卡片</el-button>
    </div>

    <el-form label-width="90px">
      <div v-for="(card, idx) in cards" :key="idx" style="background:#f5f7fa;padding:20px 20px 4px;margin-bottom:16px;border-radius:8px">
        <!-- 第一行：标题 + 类型 + 选择内容 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="卡片标题">
              <el-input v-model="card.title" placeholder="为空则用分类名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型">
              <el-select v-model="card.cardType" placeholder="选择类型" style="width:100%" @change="onTypeChange(idx)">
                <el-option label="文章分类" value="category" />
                <el-option label="标签" value="tag" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择内容">
              <el-select v-model="card.categoryId" filterable placeholder="搜索并选择" style="width:100%" :disabled="!card.cardType">
                <el-option v-for="opt in card.cardType==='tag'?tagOptions:cateOptions" :key="opt.id" :label="opt.name" :value="opt.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行：文章数 + 排序 + 启用 + 删除 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="文章数">
              <el-input-number v-model="card.articleLimit" :min="1" :max="20" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="排序">
              <el-input-number v-model="card.sortOrder" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启用">
              <el-switch v-model="card.enable" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作">
              <el-button type="danger" :icon="Delete" @click="removeCard(idx)">删除卡片</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <div style="text-align:center;margin-top:20px">
      <el-button type="primary" size="large" @click="saveAll">保存全部</el-button>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getHomeCardListApi, addHomeCardApi, updateHomeCardApi, deleteHomeCardApi } from '@/api/system/system'
import { getCategoryListApi } from '@/api/category/category'
import { getTagListApi } from '@/api/tag/tag'

interface CardItem {
  id: number|null
  title: string
  cardType: string
  categoryId: number|null
  articleLimit: number
  sortOrder: number
  enable: boolean
}

const cards = reactive<CardItem[]>([])
const cateOptions = ref<Array<{id:number,name:string}>>([])
const tagOptions = ref<Array<{id:number,name:string}>>([])

const newCard = (): CardItem => ({
  id: null, title: '', cardType: '', categoryId: null, articleLimit: 6, sortOrder: 0, enable: true
})

const addCard = () => { cards.push(newCard()) }

const removeCard = async (idx: number) => {
  const card = cards[idx]
  if (card.id) {
    await deleteHomeCardApi(card.id)
  }
  cards.splice(idx, 1)
}

const onTypeChange = (idx: number) => {
  cards[idx].categoryId = null
}

const saveAll = async () => {
  for (const card of cards) {
    const payload: any = {
      title: card.title,
      categoryId: card.categoryId,
      articleLimit: card.articleLimit,
      sortOrder: card.sortOrder,
      enable: card.enable
    }
    if (card.id) {
      payload.id = card.id
      await updateHomeCardApi(payload)
    } else {
      const res = await addHomeCardApi(payload)
      if (res?.data?.id) card.id = res.data.id
    }
  }
  ElMessage.success('保存成功')
}

const loadData = async () => {
  try {
    const [cardRes, cateRes, tagRes] = await Promise.all([
      getHomeCardListApi(),
      getCategoryListApi(null),
      getTagListApi(null)
    ])
    if (cardRes?.data) {
      cards.splice(0, cards.length, ...cardRes.data.map((c:any) => ({
        id: c.id, title: c.title||'', cardType: 'category', categoryId: c.categoryId,
        articleLimit: c.articleLimit||6, sortOrder: c.sortOrder||0, enable: c.enable !== false
      })))
    }
    cateOptions.value = cateRes?.data || []
    tagOptions.value = tagRes?.data || []
  } catch { /* ignore */ }
}

onMounted(loadData)
</script>
