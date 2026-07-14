/**
 * 登录请求参数
 */
export interface LoginParam {
    username: string;
    password: string;
    code: string;
}

/**
 * 登录成功返回值类型
 */
export interface LoginResult {
    id: number|string;
    token: string;
    code: number;
    expireTime: number
}

/**
 * 用户权限信息
 */
export interface UserInfo {
    id: number|string;
    username: string;
    login_name: string;
    nickName?: string;
    password?: string;
    email?: string;
    avatar: string;
    roles: Array<string>
}

/**
 * 新站用户列表
 */
export interface AddUserModel {
    id?: number|string;
    username: string;
    loginName: string;
    password?: string;
    isAccountNonExpired: boolean;
    isAccountNonLocked: boolean;
    isCredentialsNonExpired: boolean;
    isEnabled: boolean;
    type?: string;//区分编辑和新增
}

/**
 * 用户注册
 */
export interface RegUserModel {
    username: string;
    loginName: string;
    password?: string;
    email: string;
    code: string;
    isEnabled: boolean;
}
/**
 * 查询参数列表
 */
export interface UserSearchParam {
    username: string;
    loginName: string;
    pageNum: number;
    pageSize: number;
}

export interface EditUserModel {
    id?: number|string;
    username: string;
    loginName: string;
    password?: string;
    avatar: string;
    email: string;
}
