import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from './router'
import {store,key} from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 统一导入el-icon图标
import * as Icons from '@element-plus/icons-vue'
import {cleanSession} from "@/utils/auth";
import resetForm from './utils/resetForm'
import objCopy from './utils/obCopy'
import myConfirm from './utils/myConfirm'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as echarts from 'echarts'
//评论相关
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
import $ from 'jquery'
// @ts-ignore
window.router=router
const app= createApp(App);
app.use(router).use(store,key).use(ElementPlus, {locale}).use(UndrawUi).mount('#app')
//挂载工具
//清空表单
app.config.globalProperties.$resetForm = resetForm;
//对象复制
app.config.globalProperties.$objCopy = objCopy;
//确定弹框
app.config.globalProperties.$myConfirm = myConfirm;

app.config.globalProperties.$echarts = echarts;
// 方式一
// Object.keys(Icons).forEach((key) => {
//     app.component(key,Icons[key as keyof typeof Icons])
// });
// 方式二
const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
};
app.component('Icon', Icon);
//typeof和keyof
// const person={
//     name:"张三",
//     age:18
// }
// //typeof获取一个对象的类型
// type tp=typeof person;
// //keyof获取某种类型的所有键(key),返回的类型是一个联合类型
// type keys=keyof tp;
// const whiteList = ['/login','/index','/article/detail','/about','/article/**','/cate','/cate/**','/tag','/tag/*','/test'];
const blackListPatterns = [/^\/admin\//]; // 使用正则表达式来匹配路径

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    console.log("token:" + token);

    function isBlacklisted(path) {
        return blackListPatterns.some(pattern => pattern.test(path));
    }

    if (!isBlacklisted(to.path)) { // 不在黑名单中
        if (to.path === "/login") {
            if (token) { // token 存在
                next({ path: '/index' });
            } else {
                next();
            }
        } else {
            next();
        }
    } else { // 后台
        console.log("后台token:",token)
        if (token) { // token 存在
            const length = store.getters.getMenuList.length<= 1
            console.log("quaxian1",store.getters.getInfo.roles)
            let hasRoles = store.getters.getInfo.roles && store.getters.getInfo.roles.includes('admin');
            if (hasRoles) {
                console.log("有权限");
                if(length){
                    await store.dispatch('getMenuList', router);
                    next({ ...to, replace: true }); // 路由动态添加后重新导航
                } else {
                    next();
                }
            } else {
                try {
                    console.log("不存在权限");
                    // vuex中不存在权限，从服务器中获取
                    await store.dispatch('getInfo');
                    let hasRole =  store.getters.getInfo.roles && store.getters.getInfo.roles.includes('admin');
                    if (hasRole) {
                        // 获取菜单，动态生成路由
                        if(length){
                            await store.dispatch('getMenuList', router);
                            next({ ...to, replace: true }); // 路由动态添加后重新导航
                        } else {
                            next();
                        }
                    } else {
                        next({ path: '/index' });
                    }
                } catch (error) {
                    // 重置token
                    cleanSession();
                    // 跳到登录
                    next({ path: '/login' });
                }
            }
        } else {
            next({ path: '/login' });
        }
    }
});

// 页面标题自动拼接网站名
router.afterEach((to) => {
  // 文章详情/分类/标签页由页面内根据实际数据动态设置标题，这里跳过
  if (to.name === 'detail' || to.name === 'category_article' || to.name === 'tag_article') return;
  const siteName = store.state.system?.system?.title || '超级博客';
  const pageTitle = (to.meta.title as string) || '';
  document.title = pageTitle ? `${pageTitle} - ${siteName}` : siteName;
});