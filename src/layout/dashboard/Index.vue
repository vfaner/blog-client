<template>
  <el-main style="background-color: #f5f7fa">
    <!-- 统计卡片 -->
    <el-row :gutter="16">
      <el-col :span="6" v-for="card in statCards" :key="card.label">
        <div class="stat-card" :style="{ background: card.bg }">
          <div class="stat-icon">
            <el-icon :size="42"><component :is="card.icon" /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ card.value }}</div>
            <div class="stat-label">{{ card.label }}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表区 -->
    <el-row :gutter="16" style="margin-top:16px">
      <el-col :span="12">
        <el-card>
          <template #header><span style="font-weight:600">各分类文章分布</span></template>
          <CommonEcharts :height="'320px'" :options="pieOption" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span style="font-weight:600">各分类文章数量</span></template>
          <CommonEcharts :height="'320px'" :options="barOption" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷信息 -->
    <el-card style="margin-top:16px">
      <template #header><span style="font-weight:600">系统信息</span></template>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="文章总数">{{ stats.articleCount }}</el-descriptions-item>
        <el-descriptions-item label="评论总数">{{ stats.commentCount }}</el-descriptions-item>
        <el-descriptions-item label="用户总数">{{ stats.userCount }}</el-descriptions-item>
        <el-descriptions-item label="分类总数">{{ stats.categoryCount }}</el-descriptions-item>
        <el-descriptions-item label="标签总数">{{ stats.tagCount }}</el-descriptions-item>
        <el-descriptions-item label="技术栈">Vue3 + SpringBoot</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-main>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onMounted } from 'vue'
import { Document, Collection, PriceTag, User } from '@element-plus/icons-vue'
import CommonEcharts from "@/components/echarts/CommonEcharts.vue"
import { getDashboardStatsApi } from "@/api/common/dashboard"

const stats = reactive({
  articleCount: 0,
  categoryCount: 0,
  tagCount: 0,
  userCount: 0,
  commentCount: 0,
  categoryStats: [] as Array<{ name: string; value: number }>
})

const statCards = computed(() => [
  { label: '文章总数', value: stats.articleCount, icon: Document, bg: 'linear-gradient(135deg,#667eea,#764ba2)' },
  { label: '分类总数', value: stats.categoryCount, icon: Collection, bg: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { label: '标签总数', value: stats.tagCount, icon: PriceTag, bg: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { label: '用户总数', value: stats.userCount, icon: User, bg: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
])

const pieOption = reactive<any>({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center' },
  series: [{
    name: '文章分布', type: 'pie', radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
    label: { show: false, position: 'center' },
    emphasis: { label: { show: true, fontSize: 24, fontWeight: 'bold' } },
    data: [] as any[]
  }]
})

const barOption = reactive<any>({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: [] as string[] },
  yAxis: { type: 'value' },
  series: [{
    data: [] as number[], type: 'bar', barWidth: '50%',
    itemStyle: { color: '#409eff', borderRadius: [6, 6, 0, 0] }
  }]
})

const loadStats = async () => {
  try {
    const res = await getDashboardStatsApi()
    if (res && res.code === 200 && res.data) {
      Object.assign(stats, res.data)
      const cs = res.data.categoryStats || []
      pieOption.series[0].data = cs
      barOption.xAxis.data = cs.map((c: any) => c.name)
      barOption.series[0].data = cs.map((c: any) => c.value)
    }
  } catch { /* 后端不可达 */ }
}

onMounted(loadStats)
</script>

<style scoped lang='scss'>
.stat-card {
  display: flex;
  align-items: center;
  padding: 24px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  .stat-icon {
    margin-right: 20px;
    opacity: 0.85;
  }
  .stat-info {
    .stat-value { font-size: 32px; font-weight: 700; line-height: 1; }
    .stat-label { font-size: 14px; margin-top: 8px; opacity: 0.9; }
  }
}
</style>
