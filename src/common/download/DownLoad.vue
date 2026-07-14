<template>
  <div v-if="downloadName || downloadUrl" class="down-box">
    <div class="box-title"><i class="fa fa-download" style="margin-right:6px"></i>文件下载</div>
    <div class="box-body">
      <div class="attach-name">附件：<span>{{ downloadName || '资源文件' }}</span></div>
      <div class="attach-meta">
        <span v-if="downloadSize">文件大小：{{ downloadSize }}</span>
        <span v-if="downloadDesc">{{ downloadDesc }}</span>
      </div>
      <a class="down-btn" :href="downloadUrl" target="_blank">
        <i class="fa fa-cloud-download" style="margin-right:6px"></i>立即下载
      </a>
    </div>
    <div class="down-tip">
      本站资源仅供学习交流使用，版权归原作者所有，请在下载后24小时内删除。
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  downloadName?: string
  downloadUrl?: string
  downloadSize?: string
  downloadDesc?: string
}>()
</script>

<style scoped lang="scss">
.down-box {
  margin: 20px 0;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  .box-title {
    background: linear-gradient(135deg, #409eff, #66b1ff);
    color: #fff;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .box-body {
    padding: 20px;
    text-align: center;
    .attach-name {
      font-size: 15px;
      color: #303133;
      margin-bottom: 8px;
      span { color: #409eff; font-weight: 600; }
    }
    .attach-meta {
      color: #909399;
      font-size: 13px;
      margin-bottom: 16px;
      span { margin: 0 8px; }
    }
    .down-btn {
      display: inline-block;
      background: linear-gradient(135deg, #67c23a, #85ce61);
      color: #fff;
      padding: 10px 40px;
      border-radius: 24px;
      text-decoration: none;
      font-size: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(103, 194, 58, 0.4);
      }
    }
  }
  .down-tip {
    background: #fafafa;
    color: #c0c4cc;
    font-size: 12px;
    padding: 10px 20px;
    line-height: 1.6;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
