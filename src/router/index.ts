import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
import Common from '@/common/Index.vue'
import User from '@/common/user/Index.vue'
const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        component: Layout,
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                component: () => import('@/layout/dashboard/Index.vue'),
                name: 'dashboard',
                meta: {
                    title: '仪表盘',
                    icon: '#icondashboard'
                }
            }
        ]
    },
    {
        path: '/',
        component: Common,
        redirect: '/index',
        children: [
            {
                path: '/index',
                // component: () => import('@/common/page/Home.vue'),
                component: () => import('@/common/HomeView/HomeMain.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'fa fa-home'
                }
            },

            {
                path: '/article/detail',
                component: () => import('@/common/page/ArticleDetail.vue'),
                name: 'detail',
                meta: {
                    title: '文章详情'
                }
            },
            {
                path: '/articles',
                component: () => import('@/common/page/ArticleSearch.vue'),
                name: 'article_search',
                meta: {
                    title: '文章搜索'
                }
            },
            {
                path: '/cate/:id',
                component: () => import('@/common/page/CateArticle.vue'),
                name: 'cate_article',
                meta: {
                    title: '某分类下的文章'
                }
            },
            {
                path: '/category/:id',
                component: () => import('@/common/page/CategoryArticle.vue'),
                name: 'category_article',
                meta: {
                    title: '某分类下的文章'
                }
            },
            {
                path: '/tag/:id',
                component: () => import('@/common/page/TagArticle.vue'),
                name: 'tag_article',
                meta: {
                    title: '某标签下的文章'
                }
            },
            {
                path: '/user',
                component: User,
                redirect: '/user/center',
                children:[
                    {
                        path: '/user/center',
                        component: () => import('@/common/user/UserCenter.vue'),
                        name: 'center',
                        meta: {
                            title: '用户中心'
                        }
                    },
                    {
                        path: '/user/write_article',
                        component: () => import('@/common/user/WriteArticle.vue'),
                        name: 'write_article',
                        meta: {
                            title: '发布文章'
                        }
                    },
                    {
                        path: '/user/my_articles',
                        component: () => import('@/common/user/MyArticles.vue'),
                        name: 'my_articles',
                        meta: {
                            title: '我的文章'
                        }
                    },
                    {
                        path: '/user/my_comments',
                        component: () => import('@/common/user/MyComments.vue'),
                        name: 'my_comments',
                        meta: {
                            title: '我的评论'
                        }
                    },
                    {
                        path: '/user/edit',
                        component: () => import('@/common/user/EditInfo.vue'),
                        name: 'info',
                        meta: {
                            title: '修改资料'
                        }
                    },
                ]
            },
            // {
            //     path: '/about',
            //     component: () => import('@/common/page/About.vue'),
            //     name: 'about',
            //     meta: {
            //         title: '关于',
            //         icon: '#icondashboard'
            //     }
            // },
            // {
            //     path: '/cate',
            //     component: () => import('@/common/page/Cate.vue'),
            //     name: 'cate',
            //     meta: {
            //         title: '分类',
            //         icon: '#icondashboard'
            //     }
            // },
        ]
    },

    {
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        name: 'login',
        meta: {
            title: '登录'
        }
    },
    {
        path: '/test',
        component: () => import('@/common/test/Test.vue'),
        name: 'test',
        meta: {
            title: '测试'
        }
    },
]
//创建
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

export default router
