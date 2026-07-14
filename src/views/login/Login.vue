<template>
  <div class="loginContainer background">
    <el-form
        ref="loginFormRef"
        class="loginForm"
        :model="loginModel"
        :rules="rules"
        size="large"
        :inline="false"
    >
      <div class="loginTitle">
        系统登录
      </div>

      <el-form-item prop="username">
        <el-input
            v-model="loginModel.username"
            placeholder="请输入账户"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginModel.password"
            type="password"
            
            placeholder="请输入密码"
        />
      </el-form-item>
<!--      <el-form-item prop="code">-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="16">-->
<!--            <el-input-->
<!--                v-model="loginModel.code"-->
<!--                placeholder="请输入验证码"-->
<!--            />-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <img :src="imgSrc" @click="getImage"/>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-row
            :gutter="20"
            style="margin-top: 10px;width: 100%;"
        >
          <el-col :span="12">
            <el-button
                class="myBtn"
                type="primary"
                size="default"
                @click="login"
            >
              登录
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button
                class="myBtn"
                size="default"
            >
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
// import useImage from "@/composables/login/useImage";
import useBaseLogin from "@/composables/login/useBaseLogin";
import useLogin from "@/composables/login/useLogin";
// import {onMounted} from "vue";
//验证码
// const {imgSrc, getImage} = useImage();
// 基础数据
const {loginModel, rules, loginFormRef} = useBaseLogin();
//登录
const {login} = useLogin(loginModel);
// onMounted(() => {
//     getImage()
// })
</script>
<style scoped lang='scss'>
.background {
  background-image: url('https://img1.baidu.com/it/u=4064699362,241887164&fm=253');
  background-size: cover; /* 让背景图片覆盖整个屏幕 */
  background-position: center center; /* 将背景图居中 */
  background-repeat: no-repeat; /* 避免图片重复 */
  height: 100%; /* 设置 div 高度为 100% */
  width: 100%; /* 设置 div 宽度为 100% */
}
.loginContainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-image: url("https://ftp.bmp.ovh/imgs/2019/10/87268dc0539fc7a2.jpg");
  //background: #F9F9F9 url(https://ftp.bmp.ovh/imgs/2019/10/87268dc0539fc7a2.jpg);

  .loginForm {
    height: 320px;
    width: 400px;
    border-radius: 10px;
    padding: 20px 35px;
    box-shadow: 0 0 25px #cac6c6;

    .loginTitle {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 18px !important;
    }

    .myBtn {
      width: 100%;
    }
  }
}

:deep .el-row {
  width: 100% !important;
}
</style>
