import {DialogModel} from "@/type/BaseType";
import {EditType, Title} from "@/type/BaseEnum";
import {reactive, ref} from "vue";
import {ElForm} from "element-plus";
import useInstance from "@/hooks/useInstance";
import {AddCategoryModel} from "@/api/category/CategoryModel";

export default function useAddCategory(dialog: DialogModel, onClose, onShow, emit) {
    //获取全局属性
    const {global} = useInstance();
    //ref的属性
    const addCategoryForm = ref<InstanceType<typeof ElForm>>()
    //表单绑定的数据
    const addModel = reactive<AddCategoryModel>({
        id:'',
        name: '',
        alias: '',
        description: '',
        type: ''
    })
    //表单验证规则
    const rules = reactive({
        name: [{
            trigger: 'change',
            required: true,
            message: '请输入分类名称'
        }]
    })
    //确定
    const confirm = () => {
        addCategoryForm.value?.validate(isValid => {
            if (isValid) {
                emit('save', addModel)
                //关闭弹窗
                onClose();
            }
        })
    }
    //显示弹框
    const show = (type: string, row: AddCategoryModel) => {
        dialog.height = 150;
        //设置弹框标题
        dialog.title = type == EditType.ADD ? Title.ADD : Title.EDIT
        //清空表单
        global.$resetForm(addCategoryForm.value, addModel)
        //显示弹框
        onShow();
        //判断是否编辑，复制当前行到表单数据
        if (type == EditType.EDIT) {
            global.$objCopy(row, addModel)
        }
        //设置编辑属性
        addModel.type = type;
    }
    return {
        confirm,
        show,
        addModel,
        rules,
        addCategoryForm
    }
}
