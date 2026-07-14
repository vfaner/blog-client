import {onMounted, reactive, watch} from "vue";
import {ConfigApi, ShowParam} from "@/api/comment/CommentModel";
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases
// static文件放在public下,引入emoji.ts文件可以移动到自定义位置
import emoji from "@/composables/common/emoji";
import {store} from "@/store";
import {getTreeApi} from "@/api/comment/comment";
import _ from "lodash";
import {useRoute} from "vue-router";

export default function useCommentShow() {

    const route = useRoute();

    const config = reactive<any>({
        user: {
            id: store.state.user.userId ? store.state.user.userId : 9,
            username: store.getters.getInfo?.nickName || store.getters.getInfo?.username || '游客',
            avatar: store.getters.getInfo?.avatar || '/src/assets/avatar.jpg',
            likeIds: []
        },
        emoji: emoji,
        comments: [],
        total: 0
    })

    const getTreeData = async(params:ShowParam) => {
        try {
            const param = _.pickBy({...params})
            let res = await getTreeApi(param)
            if (res && res.data) {
                const mapped = (res.data || []).map((c: any) => mapComment(c))
                config.comments = mapped
                ;(config as any).total = mapped.length
            }
        } catch { /* 后端不可用 */ }
    }

    // 递归映射评论字段，兼容 undraw-ui 的 CommentApi 结构
    const mapComment = (c: any): any => {
        const replyList = (c.reply && c.reply.list) ? c.reply.list : (c.children || [])
        return {
            id: c.uid,
            uid: c.uid,
            parentId: c.parentId,
            address: c.address || '',
            content: c.content || '',
            likes: c.like || 0,
            createTime: c.createTime || c.createdTime || '',
            user: {
                username: c.username || '匿名',
                avatar: c.avatar || '/src/assets/avatar.jpg',
                level: c.level || 1,
                homeLink: c.link || 'javascript:;'
            },
            reply: {
                total: replyList.length,
                list: replyList.map((r: any) => mapComment(r))
            }
        }
    }

    onMounted(()=>{
        let param = {
            articleId: route.query.id ? route.query.id : 9,
            lazy: false,
            pid:0
        } as ShowParam
        getTreeData(param)
    })

    // 路由 id 变化时重新加载评论
    watch(() => route.query.id, (newId) => {
        if (newId) {
            getTreeData({ articleId: newId, lazy: false, pid: 0 } as ShowParam)
        }
    })

    return {
        config,
    }
}




