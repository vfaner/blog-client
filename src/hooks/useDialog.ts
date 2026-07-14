/**
 * 弹窗相关操作
 */
import {DialogModel} from "@/type/BaseType";
import {reactive} from "vue";

export default function useDialog() {
//弹框属性
    const dialog = reactive<DialogModel>({
        title: '',
        visible: false,
        width: 630,
        height: 280
    });
    //展示
    const onShow = () => {
        dialog.visible = true;
    }
    //关闭
    const onClose = () => {
        dialog.visible = false;
    }
    //确认
    const onConfirm = () => {
        dialog.visible = false;
    }
    return {
        dialog,
        onClose,
        onShow,
        onConfirm
    }
}
