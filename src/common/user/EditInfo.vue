<template>
  <div class="user-main" style="display: none;">
  </div>
  <ul class="user-meta">
    <form  name="blooger" class="form-horizontal" id="updatefrom" enctype="multipart/form-data">
      <li><label>用户ID</label>
        <input type="text" name="userId" id="userId" v-model="user.id" class="form-control" disabled="disabled">
      </li>
      <li><label>登录账号</label>
        <input type="text" name="username" id="username" v-model="user.username" class="form-control" disabled="disabled">
      </li>
      <!--              <li><label>账号余额</label>-->
      <!--                <input type="text" name="money" id="money" value="0.00" class="form-control" disabled="disabled">-->
      <!--              </li>-->
      <li><label>个人头像</label>
        <input type="text" name="avatar" id="avatar" v-model="user.avatar" class="form-control form-xg" disabled="disabled">
      </li>
      <li><label>我的昵称</label>
        <input type="text" name="name" id="name" v-model="user.login_name" class="form-control form-xg" disabled="disabled">
      </li>
      <li><label>邮箱号码</label>
        <input type="email" name="email" id="email" v-model="user.email" class="form-control form-xg" disabled="disabled">
      </li>
<!--      <li><label>QQ 号码</label>-->
<!--        <input type="text" name="qq" id="qq" v-model="user.id" class="form-control form-xg" disabled="disabled">-->
<!--      </li>-->
      <div class="hide-ps" style="display: none;">
        <li><label>新的密码</label>
          <input type="password" name="newpass" id="newpass" v-model="user.password" class="form-control">
        </li>
        <li><label>确认密码</label>
          <input type="text" name="repeatpass" id="repeatpass" value="" class="form-control">
          <ul style="display: block;">
            <li style="display: list-item;">请检查两次输入的密码是否一样.</li>
          </ul>
        </li>
      </div>
<!--      <li><label>我的描述</label>-->
<!--        <textarea placeholder="" rows="2" cols="30" class="form-control form-xg" name="description" id="description" disabled="disabled"></textarea>-->
<!--      </li>-->
      <li class="tijiao-token">
        <div id="contentdiv_c">
        </div>
        <input name="token" id="token" value="65ef3c09b2556e6e105c38d9204db892" type="hidden">
        <span class="xgzl" style="display: inline-block;">修改资料</span>
        <input type="submit" id="update-submit" class="hide-xg" value="立即提交" style="display: none;margin-right: 5px">
        <span class="hide-xg qxxg" style="display: none;">取消修改</span>
      </li>
    </form>
  </ul>
</template>
<script setup lang="ts">
// @ts-nocheck
import avatar from '@/assets/avatar.png'
import useInstance from "@/hooks/useInstance";
import { UToast } from 'undraw-ui'
import useUser from "@/composables/user/useUser";
import {computed, reactive} from "vue";
import {EditUserModel, UserInfo} from "@/api/user/userModel";
import {useStore} from "@/store";
const {global} = useInstance();
const store = useStore();
//菜单数据
const user: UserInfo = computed(() => {
  return store.getters.getInfo
})
const editUser = reactive<EditUserModel>({
  id: 0,
  username: 'undefined',
  login_name: '游客',
  avatar: avatar,
  email: '123456@qq.com'
})
const {modifyUser} = useUser()

$(function () {
  $(".xgzl").on('click',function(){
    $(".form-xg").attr("disabled",false);
    $(".hide-xg,.hide-ps").show();
    $(".fasex").hide();
    $(this).hide();
  });
  $(".qxxg").on('click',function(){
    $(".form-xg").attr("disabled","disabled");
    $(".hide-xg,.hide-ps").hide();
    $(".xgzl,.fasex").show();
  });
})

$(function(){
  $('#update-submit').on('click',function (){
    editUser.username = String($("input[name=username]").val()).replace(/(^\s*)|(\s*$)/g, "");
    editUser.loginName = String($("input[name=name]").val()).replace(/(^\s*)|(\s*$)/g, "");
    editUser.avatar = String($("input[name=avatar]").val()).replace(/(^\s*)|(\s*$)/g, "");
    editUser.id = String($("input[name=userId]").val()).replace(/(^\s*)|(\s*$)/g, "");
    editUser.email = String($("input[name=email]").val()).replace(/(^\s*)|(\s*$)/g, "");
    //var sex = $("input[name=sex]").val().replace(/(^\s*)|(\s*$)/g, "");
    // const description = String($("textarea[name=description]").val()).replace(/(^\s*)|(\s*$)/g, "");
    editUser.password = String($("input[name=newpass]").val()).replace(/(^\s*)|(\s*$)/g, "");
    const rewp = String($("input[name=repeatpass]").val()).replace(/(^\s*)|(\s*$)/g, "");
    const params = $('#updatefrom').serialize();
    console.log(params)
    if(editUser.password!==rewp){
      UToast({ message: '密码输入不一致', type: 'error' })
      // global.$message({message: "密码输入不一致", type: 'error',offset:80})
      return false;
    }
    modifyUser(editUser)
    return false;
  });
});
</script>
<style scoped lang="scss">
</style>
<style src="@/assets/style/user.css" scoped></style>

