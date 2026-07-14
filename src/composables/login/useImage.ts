import {ref, onMounted} from 'vue'
import {getImagApi} from '@/api/user/user';

export default function useImage() {

    //定义图片src
    const imgSrc = ref('');

    // 获取图片
    //btoa 创建一个base64编码的字符串
    const getImage = async () => {
        try {
            await getImagApi().then(res => {
                return res.data.data?.identifyCode || res.data?.identifyCode || '';
            }).then(data => {
                imgSrc.value = data;
            })
        } catch {
            imgSrc.value = '';
        }
    }

    return {
        imgSrc,
        getImage
    }
}
