export interface AddMenuModel {
    id?: string | number;
    editType: string; //新增 编辑
    type: string;
    parentId: string | number;
    parentName: string;
    label: string;
    icon: string;
    name: string;
    path: string;
    url: string;
    code: string;
    orderNum: string | number;
}
export interface MenuModel{
    id: string | number,
    parentId: string,
    parentName: string,
    label: string,
    code: string,
    path: string,
    name: string,
    url: string,
    orderNum: string | number,
    type: string,
    icon: string,
    enable: boolean,
    createdTime: string,
    updatedTime: string,
    children:Array<MenuModel>,
    value: string,
    open: boolean
}
export interface SelectNode {
    id: string | number,
    name: string
}
