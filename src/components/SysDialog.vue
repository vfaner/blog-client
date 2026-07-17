<template>
  <el-dialog
      :title="title"
      :model-value="visible"
      :before-close="onClose"
      append-to-body
      :width="dialogWidth"
      :top="'8vh'"
      class="sys-dialog"
  >
    <div class="container" :style="containerStyle">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
      <el-button type="info" @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { computed } from 'vue'

const props = defineProps({//弹窗标题
  title: {
    type: String,
    default: '标题'
  },
  visible: {//控制弹窗的展示和隐藏
    type: Boolean,
    default: false
  },
  // 宽度：数字视为像素上限，同时受 90vw 约束；字符串（如 "60%"）原样透传
  width: {
    type: [Number, String],
    default: 720
  },
  // 高度：数字表示最小高度上限（内容更多时自适应撑高）；0/未传时完全自适应
  height: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['onClose', 'onConfirm'])

const dialogWidth = computed(() => {
  if (typeof props.width === 'string') return props.width
  // 数字宽度：min(用户指定, 90vw)，避免小屏溢出
  return `min(${props.width}px, 90vw)`
})
const containerStyle = computed(() => {
  // 高度：如果传了具体值就作为 min-height，让内容更多时自动撑开；同时限制 max-height 防止超出屏幕
  const style: Record<string, string> = {
    maxHeight: '70vh',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
  if (props.height && props.height > 0) {
    style.minHeight = props.height + 'px'
  }
  return style
})
//定义弹窗的关闭
const onClose = () => {
  emit('onClose')
}
//定义弹窗确认
const onConfirm = () => {
  emit('onConfirm')
}
</script>
<style scoped lang='scss'>
.container {
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
/* el-row 的默认负边距会在窄容器里溢出，强制不溢出 */
.container :deep(.el-row) {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
/* el-col 的左右 padding 是 gutter 的一半，交由 el-row 的 gutter 属性驱动 */

.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;

  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;

    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }

    .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    padding: 10px;
  }

  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>
