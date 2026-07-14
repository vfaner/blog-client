import {onMounted, reactive} from "vue";
import {CommentSearchParam} from "@/api/comment/CommentModel";
import {getListApi} from "@/api/comment/comment";
import _ from "lodash";
import {useRoute} from "vue-router";

export default function useCommentList() {

    const route = useRoute();

    const commentTable = reactive({
        list: [],
        pageNum:0,
        pageSize:0,
        total:0,
    })
    const listParam = reactive<CommentSearchParam>({
        username:'',
        pageNum: 0,
        pageSize: 10
    })
    const getCommentList = async() => {
        const param = _.pickBy({...listParam})
        let res = await getListApi(param)
        console.log(res)
        if (res) {
            commentTable.list = res.data.commentVo2
            commentTable.total = res.data.total
        }
    }

    //重置按钮
    const resetBtn = () => {
        listParam.username = '';

    }
    //页容量改变触发
    const sizeChange = (size: number) => {
        listParam.pageSize = size;

    }
    //页数改变触发
    const currentChange = (page: number) => {
        listParam.pageNum = page;

    }

    //搜索按钮
    const searchBtn = () => {
        getCommentList().then();
    }
    onMounted(()=>{
        getCommentList().then()
    })

    return {
        commentTable,
        getCommentList,
        listParam,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}




