<template>
  <header class="header">
    <section class="container">
      <h1 class="logo"><a href="/"><img  :src="logo" alt="超级博客"></a></h1>
      <div v-if="!token" class="wel">
        <div class="wel-item">
          <a href="javascript:;" class="user-login" data-sign="0">登录</a>
        </div>
        <div class="wel-item wel-item-btn">
          <a href="javascript:;" class="user-reg" data-sign="1">我要注册</a>
        </div>
      </div>
      <div v-else class="wel">
        <div class="wel-item has-sub-menu user-menu">
          <img alt="" :src="user.avatar || avatar" class="avatar">
          <span class="username">{{ user.nickName || user.login_name || user.username }}</span>
          <div class="sub-menu">
            <ul>
              <li><a href="/user/center">会员中心</a></li>
              <li><a href="/user/edit">修改资料</a></li>
              <li><a href="javascript:;" @click="loginOut">退出</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="site-navbar">
        <ul>
          <Menu />
        </ul>
      </div>
      <div class="m-wel-start">
        <a href="javascript:;" class="user-login" data-sign="0"><i class="fa fa-login"></i></a>
      </div>
      <div class="m-navbar-start">
        <i class="fa fa-bars m-icon-nav"></i>
      </div>
      <div class="header-search">
        <button type="button" class="search-toggle" @click="toggleSearch" :aria-expanded="searchOpen">
          <i class="fa" :class="searchOpen ? 'fa-times' : 'fa-search'"></i>
        </button>
        <transition name="search-slide">
          <div v-if="searchOpen" class="search-panel" @click.self="searchOpen = false">
            <div class="search-input-wrap">
              <i class="fa fa-search prefix-icon"></i>
              <input
                ref="searchInput"
                v-model="keyword"
                @keyup.enter="enters(keyword)"
                @keyup.esc="searchOpen = false"
                type="text"
                placeholder="输入关键字，按 Enter 键搜索…"
                class="search-input"
              >
              <button v-if="keyword" class="clear-btn" @click="keyword = ''" aria-label="清空">
                <i class="fa fa-times-circle"></i>
              </button>
              <button class="submit-btn" @click="enters(keyword)">搜索</button>
            </div>
          </div>
        </transition>
      </div>
    </section>
  </header>
  <div id="sign">
    <div class="part loginPart shadow">
      <form id="formtest" action="./" method="post">
        <div id="register-active" class="switch">
          <i class="fa fa-toggle-on"></i>切换注册
        </div>
        <h3>登录</h3>
        <p class="status" id="contentdiv_a"></p>
        <p>
          <label class="icon"><i class="fa fa-user"></i></label>
          <input class="input-control" id="input1" type="text" placeholder="请输入用户名" name="username" aria-required="true" v-model="loginModel.username">
        </p>
        <p>
          <label class="icon"><i class="fa fa-lock"></i></label>
          <input class="input-control" id="input2" type="password" placeholder="请输入密码" name="password" aria-required="true" v-model="loginModel.password">
        </p>
        <p class="safe">
          <label class="remembermetext"><input name="ispersis" type="checkbox" :checked="checked" id="ispersis" class="rememberme" value="forever">记住我的登录</label>
          <span style="float:right">
                            <a href="javascript:;" class="wjmm">忘记密码?</a>
                          </span>
        </p>
        <p>
          <input class="submit" type="button" value="立即登录" name="send_ajax" id="send_ajax">
        </p>
        <a class="close"><i class="fa fa-times"></i></a>
      </form>
      <div class="other-sign">
      </div>
    </div>
    <div class="part registerPart shadow">
      <form id="refrom" action="./" method="post">
        <div id="login-active" class="switch">
          <i class="fa fa-toggle-off"></i>切换登录
        </div>
        <h3>注册</h3>
        <p class="status" id="contentdiv_b"></p>
        <p>
          <label class="icon"><i class="fa fa-user"></i></label>
          <input class="input-control" type="text" name="reusername" v-model="regForm.username" placeholder="请输入用户名" aria-required="true">
        </p>
        <p>
          <label class="icon"><i class="fa fa-user"></i></label>
          <input class="input-control" type="text" name="loginname" v-model="regForm.loginName" placeholder="请输入昵称" aria-required="true">
        </p>
        <p>
          <label class="icon"><i class="fa fa-envelope"></i></label>
          <input class="input-control" type="email" name="regemail" v-model="regForm.email" placeholder="输入常用邮箱" aria-required="true">
        </p>
        <p>
          <label class="icon"><i class="fa fa-lock"></i></label>
          <input class="input-control" type="password" v-model="regForm.password" name="repassword" placeholder="请输入密码" aria-required="true">
        </p>
        <p>
          <label class="icon"><i class="fa fa-retweet"></i></label>
          <input class="input-control" type="password" name="repassword2" placeholder="再次输入密码" aria-required="true">
        </p>
        <p style="display:flex;align-items:center;gap:8px">
          <img class="code" :src="imgSrc" @click="getImage" id="recode" title="单击刷新验证码" style="height:38px;cursor:pointer;border:1px solid #ddd;border-radius:4px">
          <input class="input-control" type="text" id="reimgcode" v-model="regForm.code" name="reimgcode" style="flex:1" placeholder="输入验证码" aria-required="true">
        </p>
        <p>
          <input class="submit inline" type="button" value="立即注册" name="re_ajax" id="re_ajax">
        </p>
        <a class="close"><i class="fa fa-times"></i></a>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref, nextTick, watch} from 'vue'
import '@/assets/style/wow.css'
import '@/assets/style/font-awesome.min.css'
import logo from '@/assets/images/logo.png'
import useBaseLogin from "@/composables/login/useBaseLogin";
import useLogin from "@/composables/login/useLogin";
import {useStore} from "@/store";
import avatar from '@/assets/avatar.png'
import {UserInfo} from "@/api/user/userModel";
import {useRoute, useRouter} from "vue-router";
import useArticleSearch from "@/composables/article/useArticleSearch";
import useImage from "@/composables/login/useImage";
import useRegister from "@/composables/login/useRegister";
import Menu from "@/common/nav/Menu.vue";
const router = useRouter();
const store=useStore();
const route = useRoute();
const {loginModel} = useBaseLogin();
const {login,loginOut} = useLogin(loginModel);
const {imgSrc, getImage} = useImage();
const {regForm,register} = useRegister();
const keyword = ref("")

// 头部搜索面板
const searchOpen = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}
// 点击外部关闭
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!searchOpen.value) return
    const target = e.target as HTMLElement
    if (!target.closest('.header-search')) {
      searchOpen.value = false
    }
  })
})

const enters = (val: string) => {
  if (!val || !val.trim()) return
  searchOpen.value = false
  submit(val.trim())
}
const submit = (val: string) => {
  router.push({path:'/articles',query:{keyword:val}})
}

// 替换 jQuery DOM 交互
onMounted(() => {
  const body = document.body
  const mask = document.querySelector<HTMLElement>('.m-mask')
  const sign = document.getElementById('sign')
  if (!sign) return

  // 搜索由 Vue 侧处理（searchOpen ref），不再需要 DOM 事件

  // 克隆主导航到移动端
  const siteNav = document.querySelector('.site-navbar')
  if (siteNav) {
    const mobileNav = siteNav.cloneNode(true) as HTMLElement
    mobileNav.className = 'm-navbar'
    body.appendChild(mobileNav)
    mobileNav.querySelectorAll('li.menu-item-has-children').forEach(el => {
      const arrow = document.createElement('i')
      arrow.className = 'fa fa-angle-down faa'
      el.appendChild(arrow)
      arrow.addEventListener('click', () => {
        const sub = el.querySelector<HTMLElement>('.sub-menu')
        if (sub) sub.style.display = sub.style.display === 'block' ? 'none' : 'block'
      })
    })
  }

  // 用户菜单切换
  document.querySelector('.m-user')?.addEventListener('click', () => {
    body.classList.add('m-wel-on'); if (mask) mask.style.display = 'block'
  })
  if (mask) {
    mask.addEventListener('click', function(this: HTMLElement) {
      this.style.display = 'none'
      body.classList.remove('m-wel-on', 'm-nav-show')
    })
  }
  document.querySelectorAll('.m-wel-content ul a').forEach(a => {
    a.addEventListener('click', () => { if (mask) mask.style.display = 'none'; body.classList.remove('m-wel-on') })
  })

  // 移动端导航
  document.querySelector('.m-icon-nav')?.addEventListener('click', () => {
    body.classList.add('m-nav-show'); if (mask) mask.style.display = 'block'
    searchOpen.value = false
  })

  // 登录/注册弹窗
  const showOverlay = (isLogin: boolean) => {
    let overlay = document.querySelector<HTMLElement>('div.overlay')
    if (!overlay) { overlay = document.createElement('div'); overlay.className = 'overlay'; document.body.appendChild(overlay) }
    else { overlay.style.display = 'block' }
    document.body.classList.add('fadeIn')
    sign.classList.remove(isLogin ? 'register' : 'sign')
    sign.classList.add(isLogin ? 'sign' : 'register')
    const close = () => { sign.removeAttribute('class'); overlay?.remove(); document.body.classList.remove('fadeIn') }
    overlay.addEventListener('click', close, { once: true })
    document.querySelectorAll('form a.close').forEach(el => el.addEventListener('click', close, { once: true }))
  }

  document.querySelectorAll('.user-login').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showOverlay(true) }))
  document.querySelectorAll('.user-reg').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); getImage(); showOverlay(false) }))
  document.getElementById('register-active')?.addEventListener('click', () => { sign.classList.remove('sign'); sign.classList.add('register') })
  document.getElementById('login-active')?.addEventListener('click', () => { sign.classList.remove('register'); sign.classList.add('sign') })

  // 登录提交
  document.getElementById('send_ajax')?.addEventListener('click', () => {
    const el = document.getElementById('contentdiv_a')
    const u = (document.getElementById('input1') as HTMLInputElement)?.value || ''
    const p = (document.getElementById('input2') as HTMLInputElement)?.value || ''
    if (!u) { if (el) { el.style.marginTop = '-12px'; el.innerHTML = '<font color="#87CEFA">帐号不能为空</font>' }; return }
    if (!p) { if (el) { el.style.marginTop = '-12px'; el.innerHTML = '<font color="#87CEFA">密码不能为空</font>' }; return }
    login()
  })

  // 注册提交
  document.getElementById('re_ajax')?.addEventListener('click', () => {
    const el = document.getElementById('contentdiv_b')
    const show = (msg: string) => { if (el) { el.style.marginTop = '-12px'; el.innerHTML = `<font color="#87CEFA">${msg}</font>` } }
    const g = (name: string) => (document.querySelector(`input[name=${name}]`) as HTMLInputElement)?.value?.trim() || ''
    const usrName = g('reusername'), usrNick = g('loginname'), eml = g('regemail')
    const pwd = g('repassword'), pwd2 = g('repassword2'), yzm = g('reimgcode')
    if (usrName.length > 12 || pwd.length > 12) return show('用户名和密码都不能>12位')
    if (usrName.match(/\s/) || pwd.match(/\s/)) return show('用户名和密码中不能有空格')
    if (!usrName || !pwd) return show('用户名或密码不能为空')
    if (!yzm) return show('验证码都不能为空')
    if (usrName.length < 5 || pwd.length < 5) return show('用户名和密码都不能小于5位')
    if (pwd !== pwd2) return show('两次输入密码不相等')
    regForm.username = usrName; regForm.loginName = usrNick; regForm.password = pwd
    regForm.email = eml; regForm.code = yzm; regForm.isEnabled = true
    register()
  })
})
const checked = ref<boolean>(true)
const token = computed(() => store.getters.getToken)
const user: UserInfo = computed(() => store.getters.getInfo)
const {getArticleList} = useArticleSearch();
watch(() => route.query.keyword, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    getArticleList(newValue)
  }
}, {immediate: true})
</script>
<style src="@/assets/style/main.css" scoped></style>
<style lang="scss" scoped>

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #EAEAEA;
  box-shadow: 0 1px 4px rgba(0,0,0,.05);
  border-color: rgba(0,0,0,.08);
}
.overlay {
  background: #000;
  opacity: .8;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9998;
}
.shadow{
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

/* ===== 头部搜索按钮 + 下拉搜索面板 ===== */
.header-search {
  position: relative;
  float: right;
  display: flex;
  align-items: center;
  height: 66px;
  margin-right: 10px;
}
.search-toggle {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 50%;
  font-size: 16px;
  transition: background-color .2s ease, color .2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.search-toggle:hover {
  background: #f4ecff;
  color: #C38CFF;
}

.search-panel {
  position: absolute;
  top: calc(100% - 6px);
  right: 0;
  z-index: 999;
  padding: 12px 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0,0,0,.12);
  border: 1px solid #f0f0f0;
  width: 380px;
}
.search-panel::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 20px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
  transform: rotate(45deg);
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 36px;
  padding-right: 4px;
  background: #f7f7f9;
  border-radius: 8px;
  transition: background-color .2s ease, box-shadow .2s ease;
}
.search-input-wrap:focus-within {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(195, 140, 255, .25);
}
.prefix-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #909399;
  font-size: 14px;
  pointer-events: none;
}
.search-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #303133;
  padding: 0;
}
.search-input::placeholder { color: #b6b7c1; }

.clear-btn {
  border: none;
  background: transparent;
  color: #c0c4cc;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 14px;
  line-height: 1;
}
.clear-btn:hover { color: #909399; }

.submit-btn {
  margin-left: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  background: #C38CFF;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: background-color .2s ease;
}
.submit-btn:hover { background: #a86ff0; }

/* 下拉过渡 */
.search-slide-enter-active,
.search-slide-leave-active {
  transition: opacity .18s ease, transform .18s ease;
}
.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 640px) {
  .search-panel { width: calc(100vw - 24px); right: -8px; }
}

/* 头部登录后用户区（头像 + 用户名 + 下拉菜单）排版修正 */
.wel :deep(.user-menu) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  cursor: pointer;
  height: 66px;
  line-height: 1;
}
.wel :deep(.user-menu .avatar) {
  /* 覆盖 main.css 里的 float / margin-top，让头像与文字垂直居中 */
  float: none;
  margin: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #409eff;
  flex-shrink: 0;
}
.wel :deep(.user-menu .username) {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
}
/* 下拉列表：加宽 + 靠右对齐 + 文字不换行 */
.wel :deep(.user-menu .sub-menu) {
  right: 0;
  left: auto;
  min-width: 140px;
}
.wel :deep(.user-menu .sub-menu ul) {
  padding: 6px 0;
  border-radius: 6px;
}
.wel :deep(.user-menu .sub-menu a) {
  display: block;
  padding: 10px 20px;
  line-height: 1.4;
  white-space: nowrap;
  text-align: center;
  color: #333;
}
.wel :deep(.user-menu .sub-menu a:hover) {
  color: #0ae;
  background-color: #f2f2f4;
}
.wel :deep(.user-menu .sub-menu ul::before),
.wel :deep(.user-menu .sub-menu ul::after) {
  /* 小三角对齐头像中心（头像宽 36 + gap 8 + 边距 12 = 大约 40 处），随宽度改变；这里放到菜单中间即可 */
  left: 50%;
}
.wel :deep(.user-menu:hover .sub-menu) {
  top: 56px;
}

</style>
