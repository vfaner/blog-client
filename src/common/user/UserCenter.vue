<template>
<div>
    <div class="row">
        <div class="col-xl-4 col-sm-4 mb-4">
            <div class="user-card bg-primary" style="background-color: pink;">
                <div class="card-body">
                    <div class="card-body-icon">
                        <i class="fa fa-cogs"></i>
                    </div>
                    <div class="mr-5">
                        个人资料
                    </div>
                </div>
                <a class="card-footer" href="?user&datas">
                    <span class="float-left">修改资料</span>
                    <span class="float-right">
					<i class="fa fa-angle-right"></i>
					</span>
                </a>
            </div>
        </div>
        <div class="col-xl-4 col-sm-4 mb-4">
            <div class="user-card bg-warning">
                <div class="card-body">
                    <div class="card-body-icon">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="mr-5">
                        我的评论
                    </div>
                </div>
                <a class="card-footer" href="?user&comments">
                    <span class="float-left">查看详情</span>
                    <span class="float-right">
					<i class="fa fa-angle-right"></i>
					</span>
                </a>
            </div>
        </div>
        <div class="col-xl-4 col-sm-4 mb-4">
            <div class="user-card bg-success">
                <div class="card-body">
                    <div class="card-body-icon">
                        <i class="fa fa-pencil-square-o"></i>
                    </div>
                    <div class="mr-5">
                        我的文章
                    </div>
                </div>
                <a class="card-footer" href="?user&posts">
                    <span class="float-left">查看详情</span>
                    <span class="float-right">
					<i class="fa fa-angle-right"></i>
					</span>
                </a>
            </div>
        </div>
    </div>
  <section class="author-card col-xl-6 col-sm-6 mb-6">
    <div class="inner">
      <img :src="user.avatar?user.avatar:avatar" class="avatar avatar-100" height="50"
           width="50"
      >
      <div class="card-text">
        <div class="display-name">
          {{user.login_name}}&nbsp;&nbsp;<span class="vipimgicon vp0">未开通</span>
        </div>
<!--        <div class="register-time">-->
<!--          未开通-->
<!--        </div>-->
        <section class="info-basis">
          <header>
            <h2>基本信息</h2>
          </header>
          <div class="info-group clearfix">
            <label class="col-md-3 control-label">用户ID</label>
            <p class="col-md-9">
              {{ user.id }} </p>
          </div>
          <div class="info-group clearfix">
            <label class="col-md-3 control-label">登录账户</label>
            <p class="col-md-9">
              {{ user.username }} </p>
          </div>
          <div class="info-group clearfix">
            <label class="col-md-3 control-label">昵称</label>
            <p class="col-md-9">
              {{ user.login_name }} </p>
          </div>
          <div class="info-group clearfix">
            <label class="col-md-3 control-label">邮箱</label>
            <p class="col-md-9">
              {{user.email}} </p>
          </div>
          <div class="info-group clearfix">
            <label class="col-md-3 control-label">头像地址</label>
            <p class="col-md-9">
              {{user.avatar}} </p>
          </div>
<!--          <div class="info-group clearfix">-->
<!--            <label class="col-md-3 control-label">网页</label>-->
<!--            <p class="col-md-9">-->
<!--              https://huayula.com/author/1137 </p>-->
<!--          </div>-->
<!--          <div class="info-group clearfix">-->
<!--            <label class="col-md-3 control-label">个人描述</label>-->
<!--            <p class="col-md-9">-->
<!--            </p>-->
<!--          </div>-->
        </section>
      </div>
    </div>
  </section>

</div>
</template>
<script setup lang="ts">
import {useStore} from "@/store";
import {computed} from "vue";
import {UserInfo} from "@/api/user/userModel";
import avatar from '@/assets/avatar.png'
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
