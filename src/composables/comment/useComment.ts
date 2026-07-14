import {UToast} from "undraw-ui";
import http from "@/http/http";
import {useRoute} from "vue-router";

export default function useComment(config: any) {
    const route = useRoute();

    // 提交评论事件（undraw-ui 的 SubmitParamApi 不含 articleId，从路由获取）
    const submit = async ({ content, parentId, finish }: any) => {
        const articleId = Number(route.query.id)
        const res = await http.post('rgh/api/comment', {
            content,
            parentId: parentId || null,
            articleId: articleId || null,
            username: config.user.username,
            avatar: config.user.avatar,
            level: 1,
        })
        if (res && res.code === 200) {
            UToast({ message: '评论成功，等待审核!', type: 'success' })
            if (typeof finish === 'function') finish()
            // 等待审核，不立即刷新展示
        } else {
            UToast({ message: res?.msg || '评论失败', type: 'error' })
        }
    }

    // 点赞按钮事件
    const like = async (id: number) => {
        const likes: number[] = config.user.likeIds || []
        if (likes.indexOf(id) === -1) {
            likes.push(id)
            await http.put(`rgh/api/comment/like/${id}`, { delta: 1 })
        } else {
            likes.splice(likes.findIndex(item => item === id), 1)
            await http.put(`rgh/api/comment/like/${id}`, { delta: -1 })
        }
    }

    // 删除评论
    const remove = async (id: number, finish: () => void) => {
        const res = await http.delete('rgh/api/comment', id)
        if (res && res.code === 200) {
            if (typeof finish === 'function') finish()
            UToast({ message: '删除成功!', type: 'success' })
        } else {
            UToast({ message: '删除失败', type: 'error' })
        }
    }

    // 举报用户
    const report = (id: string, finish: () => void) => {
        setTimeout(() => {
            if (typeof finish === 'function') finish()
            UToast({ message: '举报成功', type: 'success' })
        }, 200)
    }

    return { submit, report, like, remove }
}
