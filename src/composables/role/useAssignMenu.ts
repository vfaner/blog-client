import {DialogModel} from "@/type/BaseType"
import {assignSaveApi, assignTreeApi} from "@/api/role/role";
import {AssignSaveParam, AssignTreeParam} from "@/api/role/RoleModel";
import {getUserId} from "@/utils/auth";
import {reactive, ref} from "vue";
import {ElTree} from "element-plus";
import {StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";

export default function useAssignMenu(dialog: DialogModel, onShow, onClose) {
    const {global} = useInstance()
    const assignTree = ref<InstanceType<typeof ElTree>>()
    //树的属性配置
    const defaultProps = reactive({
        children: 'children',
        label: 'label'
    })
    //权限树数据
    const assignTreeData = reactive({
        list: [],
        assignTreeChecked: []
    })
    //定义分配权限保存的参数
    const saveParam = reactive<AssignSaveParam>({
        roleId: '',
        list: []
    })
    //确定
    const confirm = async () => {
        //获取选中数据
        let checkedIds = assignTree.value?.getCheckedKeys(false) || []
        //获取半节点ids
        let hlfIds = assignTree.value?.getHalfCheckedKeys() || []
        saveParam.list = checkedIds?.concat(hlfIds)
        //提交保存
        let res = await assignSaveApi(saveParam)
        if (res && res.code === StatusCode.Success) {
            global.$message({message: res.msg, type: 'success'})
            //关闭弹窗
            onClose();
        }
    }
    //显示弹框
    const show = (roleId: string, name: string) => {
        //数据清空
        assignTreeData.list = []
        assignTreeData.assignTreeChecked = []
        //设置角色id
        saveParam.roleId = roleId
        //获取弹框树数据
        let param = {roleId: roleId, userId: getUserId() || ''}
        getAssignTree(param);
        //设置弹属性
        dialog.width = 520
        dialog.height = 0 // 自适应内容
        dialog.title = '为【' + name + '】分配权限'
        onShow();
    }
    //获取权限树数据
    const getAssignTree = async (param: AssignTreeParam) => {
        let res = await assignTreeApi(param);
        //兼容后端返回的空对象或直接数组
        if (!res || !res.data) return
        //设置权限树数据
        assignTreeData.list = res.data.listmenu || []
        //设置角色原来的权限id
        const rawChecked: number[] = res.data.checkList || []
        //数据回显：只保留叶子节点的 id 交给 el-tree 的 default-checked-keys
        //（父节点由 el-tree 通过子节点自动推导，避免"父勾则子全勾"的意外行为）
        if (rawChecked.length > 0) {
            const leafOnly: any[] = []
            rawChecked.forEach(item => checked(item, assignTreeData.list, leafOnly))
            assignTreeData.assignTreeChecked = leafOnly
        } else {
            assignTreeData.assignTreeChecked = []
        }
    }
    const checked = (id, data, newArr) => {
        data.forEach((item) => {
            if (item.id == id) {
                //如果将其放到外部，那么父节点选中后子节点将会全部选中
                if (item.children && item.children.length == 0) {
                    newArr.push(item.id)
                }
            } else {
                if (item.children && item.children.length !== 0) {
                    //递归调用
                    checked(id, item.children, newArr)
                }
            }
        })
    }
    return {
        confirm,
        show,
        assignTreeData,
        defaultProps,
        assignTree
    }
}
