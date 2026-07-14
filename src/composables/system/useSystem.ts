
import {StatusCode} from "@/http/request";
import useInstance from "@/hooks/useInstance";
import {onMounted, reactive} from "vue";
import {getConfigApi, modifyConfigApi} from "@/api/system/system";
import {ConfigModel} from "@/api/system/SystemModel";

export default function useSystem() {

    const {global} = useInstance();
    const config = reactive<ConfigModel>({
        name: '',
        author: '',
        version: '',
        compatibility: '',
        title: '',
        keyword: '',
        description: '',
        logo: '',
        favicon: '',
        card: '',
        card1: '',
        card2: '',
        advisory: "",
        adv: [],
        mobileNavEnable: false,
        mobileNavs: []
    })

    //查询系统设置
    const getConfig = async () => {
        let res = await getConfigApi()
        if (res && res.data) {
            Object.assign(config, res.data)
            // 兜底
            if (config.mobileNavEnable === undefined) config.mobileNavEnable = false
            if (!config.mobileNavs) config.mobileNavs = []
        }
    }
    //删除
    const writeConfig = async (con:ConfigModel) => {
        console.log(con)
        let res = await modifyConfigApi(con);
        if (res && res.code == StatusCode.Success) {
            //信息提示
            global.$message({message: res.msg, type: 'success'})
            //刷新表格
        }
    }
    onMounted(()=>{
        getConfig()
    })
    return {
        config,
        writeConfig
    }
}
