<template>
  <div class="reward-area">
    <a href="javascript:void(0)" class="reward-btn" @click="show=!show">
      <i class="fa fa-gift"></i> 打赏
    </a>
    <div v-if="show" class="reward-popup">
      <div class="reward-popup-header">
        感谢您的支持！
        <a href="javascript:void(0)" class="reward-close" @click="show=false">&times;</a>
      </div>
      <div class="reward-popup-body">
        <div class="reward-qrcode">
          <img :src="currentQr" alt="扫码打赏">
        </div>
        <div class="reward-switch">
          <span :class="{active:payType==='alipay'}" @click="payType='alipay';currentQr=alipayImg">支付宝</span>
          <span :class="{active:payType==='wechat'}" @click="payType='wechat';currentQr=weiPayImg">微信</span>
        </div>
      </div>
    </div>
    <div v-if="show" class="reward-overlay" @click="show=false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import alipayImg from '@/common/reward/img/alipayimg.jpg'
import weiPayImg from '@/common/reward/img/weipayimg.jpg'

const show = ref(false)
const payType = ref('alipay')
const currentQr = ref(alipayImg)
</script>

<style scoped lang="scss">
.reward-area {
  text-align: center;
  padding: 16px 0;
}
.reward-btn {
  display: inline-block;
  padding: 8px 28px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
}
.reward-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999;
}
.reward-popup {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  z-index: 10000;
  width: 320px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.reward-popup-header {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: #fff;
  padding: 12px 20px;
  font-size: 15px;
}
.reward-close {
  float: right; color: #fff; font-size: 20px; text-decoration: none;
}
.reward-popup-body {
  padding: 20px;
  text-align: center;
}
.reward-qrcode img {
  width: 200px; height: 200px; object-fit: contain;
}
.reward-switch {
  margin-top: 12px;
  span {
    display: inline-block;
    padding: 6px 20px;
    border: 1px solid #ddd;
    cursor: pointer;
    &:first-child { border-radius: 6px 0 0 6px; }
    &:last-child { border-radius: 0 6px 6px 0; }
    &.active { background: #ee5a24; color: #fff; border-color: #ee5a24; }
  }
}
</style>
