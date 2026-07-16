<template>
  <div id="fee">
    <div class="usertitle" style="background-image: url('/src/assets/images/user_bg_2.jpg');">
      <section class="container">
        <img :src="user.avatar?user.avatar:avatar" class="avatar avatar-100" height="50" width="50">
        <h2><span style="font-size: large">账号：{{ user.login_name }}</span></h2>
        <!--        <h2> 账号：</h2><h2 style="color: red">{{user.login_name}}</h2>-->
        <p>
        </p>
      </section>
    </div>
    <section class="container">
      <div class="container-user">
        <div class="userside">
          <div class="usermenus">
            <ul class="usermenu">
              <li>
                <router-link to="/user/center" active-class="active">
                  <i class="fa fa-dashboard"></i> 用户中心
                </router-link>
              </li>
              <li>
                <router-link to="/user/write_article" active-class="active">
                  <i class="fa fa-pencil-square-o"></i> 发布文章
                </router-link>
              </li>
              <li>
                <router-link to="/user/my_articles" active-class="active">
                  <i class="fa fa-file-word-o"></i> 我的文章
                </router-link>
              </li>
              <li>
                <router-link to="/user/my_comments" active-class="active">
                  <i class="fa fa-comments"></i> 我的评论
                </router-link>
              </li>
              <li>
                <router-link to="/user/edit" active-class="active">
                  <i class="fa fa-cogs"></i> 修改资料
                </router-link>
              </li>
              <li>
                <a href="javascript:;" @click="loginOut">
                  <i class="fa fa-sign-in fa-flip-horizontal"></i> 退出
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="content" id="contentframe">
          <router-view/>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

import {useStore} from "@/store";
import {computed} from "vue";
import useLogin from "@/composables/login/useLogin";
import useBaseLogin from "@/composables/login/useBaseLogin";
import {UserInfo} from "@/api/user/userModel";
import avatar from '@/assets/avatar.png'
// 基础数据
const {loginModel} = useBaseLogin();
const {loginOut} = useLogin(loginModel);
const store = useStore();
//菜单数据
const user: UserInfo = computed(() => {
  return store.getters.getInfo
})

</script>
<style scoped lang="scss">
/* 用户中心左侧菜单：去下划线 + 选中态高亮 + hover 背景 */
.usermenu li a,
.usermenu li :deep(a) {
  text-decoration: none !important;   /* 悬停不显示下划线 */
  border-left: 3px solid transparent; /* 用与选中态同宽的透明边框占位，避免选中时布局跳动 */
  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
}
.usermenu li a:hover,
.usermenu li :deep(a:hover) {
  background-color: #f7f6ff;
  color: #C38CFF;
  border-left-color: transparent;      /* 覆盖 user.css 中的 hover 加边逻辑 */
  text-decoration: none !important;
}
/* router-link 的激活态：<a class="active"> */
.usermenu li :deep(a.active),
.usermenu li.active :deep(a),
.usermenu li.active a {
  background-color: #f4ecff;
  color: #C38CFF !important;
  border-left: 3px solid #C38CFF;
  font-weight: 500;
}
.usermenu li :deep(a.active .fa),
.usermenu li.active :deep(a .fa),
.usermenu li.active a .fa {
  color: #C38CFF;
}
</style>
<style src="@/assets/style/main.css" scoped></style>
<style src="@/assets/style/user.css" scoped></style>
