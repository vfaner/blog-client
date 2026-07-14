//对象的快速复制 obj1 复制到obj2
export default function obCopy(obj1:any, obj2:any){
    Object.keys(obj2).forEach(key =>{
        obj2[key] = obj1[key]
    })
}
