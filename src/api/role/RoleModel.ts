/**
 * 角色列表查询参数
 */
export interface RoleListParam {
    userId?: string | number;
    pageNum: number;
    pageSize: number;
    name: string;
    code: string;
}

export interface AddRoleModel {
    id: number | string;
    name: string;
    code: string;
    description: string;
    type: string //区分新增编辑
}

//权限树查询的参数
export interface AssignTreeParam {
    userId: number | string;
    roleId: number | string;
}

//定义分配权限保存的参数
export interface AssignSaveParam {
    roleId: number | string;
    list: Array<string | number>;
}
