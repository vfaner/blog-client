import {onMounted, reactive, ref} from "vue";

export default function useCommon() {

    const common = reactive({
        color:""
    });

    const commonImage = ref("/src/assets/suo.jpg");
    const defColor = () => {
    // 颜色随机渐变
    let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
     common.color = colors[parseInt(String(Math.random() * 10))]
    }
    onMounted(()=>{
        defColor()
    })
    return{
        common,
        commonImage,
        defColor
    }
}
