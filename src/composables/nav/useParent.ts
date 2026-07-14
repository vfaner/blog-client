import {reactive, ref} from "vue";
import {ElTree} from "element-plus";
// @ts-ignore
import {SelectNode} from "@/api/nav/MenuModel";

export default function useParent() {
    //树的ref属性
    const parentTree = ref<InstanceType<typeof ElTree>>();
    //上级树的数据
    const treeData = reactive({
        data: []
    })
    //返回选中的数据
    const selectNode = reactive<SelectNode>({
        id: '',
        name: ''
    })
    //树的属性
    const defaultProps = reactive({
        children: 'children',//设置树的children
        label: 'name'// 设置树的名字属性字段
    })
    //树节点点击事件
    const handleNodeClick = (data: any) => {
        selectNode.id = data.id;
        selectNode.name = data.name;
        console.log(selectNode)
    }
    //获取树的数据
    const getTreeData = async () => {
        // let res = await getDeptParentApi();
        // if (res && res.code == 200) {
        //     treeData.data = res.data;
        // }
    }

    //加减号
    const openBtn = (data: any) => {
        data.open = !data.open;
        if (parentTree.value) {
            parentTree.value.store.nodesMap[data.id].expanded = !data.open;
        }
    }
    return {
        treeData,
        defaultProps,
        handleNodeClick,
        getTreeData,
        openBtn,
        parentTree,
        selectNode
    }
}
