import {Tag,Cloud} from "@/api/common/CommonModel";
import {computed, onMounted, onUnmounted, reactive} from "vue";


export default function useWordCloud() {
    const prop = withDefaults(defineProps<{
        tags: Tag[]
        width?: string  // 宽
        height?: string // 高
        radius?: string // 半径
    }>(), { width: '600', height: '600', radius: '250' })

    let speedX = Math.PI / 360
    let speedY = Math.PI / 360
    const clouds:Cloud[] = reactive([])

// 球心坐标
    const CX = computed(() => { return parseInt(prop.width) / 3.5 })
    const CY = computed(() => { return parseInt(prop.height) / 2 })

// 创建标签
    const createTags = (): Cloud[] => {
        let clouds: Cloud[] = []
        for (let i = 0, len = prop.tags.length; i < len; i++) {
            let k = -1 + (2 * (i + 1) - 1) / len
            let a = Math.acos(k)
            let b = a * Math.sqrt(len * Math.PI)
            let cloud: Cloud = {
                x: CX.value + +prop.radius * Math.sin(a) * Math.cos(b),
                y: CY.value + +prop.radius * Math.sin(a) * Math.sin(b),
                z: +prop.radius * Math.cos(a),
                text: prop.tags[i].name,
                color: prop.tags[i].color || '#333'
            }
            clouds.push(cloud)
        }
        return clouds
    }

    clouds.push(...createTags())

// 云球旋转函数-X
    const rotateX = (angleX: number) => {
        let cos = Math.cos(angleX)
        let sin = Math.sin(angleX)
        for (let cloud of clouds) {
            let _y = (cloud.y - CY.value) * cos - cloud.z * sin + CY.value
            let _z = cloud.z * cos + (cloud.y- CY.value) * sin
            cloud.y = _y
            cloud.z = _z
        }
    }
// 云球旋转函数-Y
    const rotateY = (angleY: number) => {
        let cos = Math.cos(angleY)
        let sin = Math.sin(angleY)
        for (let cloud of clouds) {
            let _x = (cloud.x - CX.value) * cos - cloud.z * sin + CX.value
            let _z = cloud.z * cos + (cloud.x - CX.value) * sin
            cloud.x = _x
            cloud.z = _z
        }
    }

// 定时器
    let timer: NodeJS.Timer
    onMounted(() => {
        timer = setInterval(() => {
            rotateX(speedX)
            rotateY(speedY)
        }, 20)
    })
    onUnmounted(() => {
        clearInterval(timer)
    })

// // 手指滑动事件
//     const listener = (event: TouchEvent) => {
//         let x = event.touches[0].pageX - CX.value
//         let y = event.touches[0].pageX - CY.value
//         speedX = x * 0.0001 > 0 ? Math.min(+prop.radius * 0.00002, x * 0.0001) :
//             Math.max(-prop.radius * 0.00002, x * 0.0001)
//         speedY = y * 0.0001 > 0 ? Math.min(+prop.radius * 0.00002, y * 0.0001) :
//             Math.max(-prop.radius * 0.00002, y * 0.0001)
//     }
// PC端
    const listener = (event: MouseEvent) => {
        let x = event.clientX - CX.value
        let y = event.clientY - CY.value
        speedX = x * 0.0001 > 0 ? Math.min(+prop.radius * 0.00002, x * 0.0001) :
            Math.max(-prop.radius * 0.00002, x * 0.0001)
        speedY = y * 0.0001 > 0 ? Math.min(+prop.radius * 0.00002, y * 0.0001) :
            Math.max(-prop.radius * 0.00002, y * 0.0001)
    }
    return {
        clouds,
        listener
    }
}



