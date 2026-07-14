import {getRolePageApi} from '@/api/role/role'
import {RoleListParam} from '@/api/role/RoleModel'
import {reactive, onMounted} from 'vue'
import _ from "lodash";

export default function useRoleTable() {
    //表格数据
    const roleTable = reactive({
        list: [],
        total: 0,
    })

    //表格查询参数
    const listParam = reactive<RoleListParam>({
        code: '',
        pageNum: 1,
        pageSize: 10,
        name: '',
    })
    //获取表格数据
    const getRoleList = async () => {
        const params = _.pickBy({...listParam})
        let res = await getRolePageApi(params)
        if (res && res.code == 200) {
            roleTable.list = res.data.records || res.data.content || []
            roleTable.total = res.data.total || res.data.totalElements || 0
        }
    }
    //搜索按钮
    const searchBtn = () => {
        getRoleList()
    }
    //重置按钮
    const resetBtn = () => {
        listParam.name = '';
        getRoleList()
    }
    //页容量改变触发
    const sizeChange = (size: number) => {
        listParam.pageSize = size;
        getRoleList();
    }
    //页数改变触发
    const currentChange = (page: number) => {
        listParam.pageNum = page;
        getRoleList();
    }
    onMounted(() => {
        getRoleList()
    })

    return {
        listParam,
        roleTable,
        getRoleList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}
