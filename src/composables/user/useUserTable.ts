import {onMounted, reactive} from "vue";
import {getUserPageApi} from "@/api/user/user";
import {UserSearchParam} from "@/api/user/userModel";
import _ from "lodash";

export default function useUserTable() {
    //表格数据
    const userTable = reactive({
        list: [],
        total:0,
    })


    //表格查询参数
    const listParam = reactive<UserSearchParam>({
        username: '',
        loginName: '',
        pageNum: 1,
        pageSize: 10
    })
    //获取表格数据
    const getUserList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getUserPageApi(params)
        if (res) {
            userTable.list = res.data.records || res.data.content || []
            userTable.total = res.data.total || res.data.totalElements || 0;
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getUserList();
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
    onMounted(() => {
        // getRoleList()
        getUserList()
    })

    return {
        listParam,
        userTable,
        getUserList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
