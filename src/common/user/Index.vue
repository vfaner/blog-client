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
              <li class="usermenu-index"><a href="/user/center"><i class="fa fa-dashboard"></i> 用户中心</a></li>
              <!--              <li class="usermenu-pay"><a href="?user&amp;record"><i class="fa fa-shopping-cart"></i> 我的订单</a></li>-->
              <li class="usermenu-post-new"><a href="/user/write_article"><i class="fa fa-pencil-square-o"></i> 发布文章</a></li>
              <!--              <li class="usermenu-post-new"><a href="?user&amp;pay"><i class="fa fa-credit-card-alt"></i> 钱包管理</a></li>-->
              <!--              <li class="usermenu-post-new"><a href="?user&amp;myvip"><i class="fa fa-diamond"></i> 我的会员</a></li>-->
              <li class="usermenu-posts"><a href="/user/my_articles"><i class="fa fa-file-word-o"></i> 我的文章</a></li>
              <li class="usermenu-comments"><a href="/user/my_comments"><i class="fa fa-comments"></i> 我的评论</a></li>
              <li class="usermenu-info"><a href="/user/edit"><i class="fa fa-cogs"></i> 修改资料</a></li>
              <li class="usermenu-signout"><a href="javascript:;" @click="loginOut"><i
                  class="fa fa-sign-in fa-flip-horizontal"
              ></i> 退出</a></li>
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
</style>
<style src="@/assets/style/main.css" scoped></style>
<style src="@/assets/style/user.css" scoped></style>
<style src="@/assets/style/bootstrap.min.css" scoped></style>
