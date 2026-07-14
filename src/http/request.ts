import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {ElMessage} from "element-plus";
import qs from 'qs'

import {LoginParam} from "@/api/user/userModel";
import {cleanSession, getToken} from "@/utils/auth";

//返回值类型
export interface Result<T = any> {
    code: number;
    msg: string;
    data: T;
}

//返回状态码
export enum StatusCode {
    NoAuth = 600, //token失效
    Success = 200 //返回成功
}

class request {
    private instance: AxiosInstance;//创建axios实例
    //构造函数给instance进行初始化
    constructor(config: AxiosRequestConfig) {
        //创建axios实例
        this.instance = axios.create(config)
        //拦截器配置
        this.interceptors()
    }

    //axios拦截器
    private interceptors() {
        //请求发送之前拦截：添加token
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            //配置token
            let token = getToken();
            if (token && config.headers) {
                config.headers.Authorization = token;
            }
            return config
        }, (error: any) => {
            // 错误抛到业务代码
            error.data = {}
            error.data.msg = '服务器异常，请联系管理员！'
            return error
        })

        /**
         * 请求返回之后拦截
         * res的类型是AxiosResponse<any>
         */
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            if (res && res.data) {
                const data = res.data as any;
                if (data.code == StatusCode.NoAuth) {
                    window.location.href = "/login";
                    cleanSession();
                    return Promise.reject(new Error('未授权'));
                } else if (res.status == StatusCode.Success || res.config.responseType === "arraybuffer") {
                    return res;
                } else {
                    ElMessage.error(data.msg || '服务器出错!')
                    return res
                }
            }
            return res

        }, (error) => { // 网络错误回调
            console.log('网络请求失败')
            error.data = {};
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.data.msg = '错误请求';
                        ElMessage.error(error.data.msg)
                        break
                    case 401:
                        error.data.msg = '未授权，请重新登录';
                        ElMessage.error(error.data.msg)
                        break
                    case 403:
                        error.data.msg = '拒绝访问';
                        ElMessage.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg = '请求错误,未找到该资源';
                        ElMessage.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg = '请求方法未允许';
                        ElMessage.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg = '请求超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg = '服务器端出错';
                        ElMessage.error(error.data.msg)
                        break
                    case 501:
                        error.data.msg = '网络未实现';
                        ElMessage.error(error.data.msg)
                        break
                    case 502:
                        error.data.msg = '网络错误';
                        ElMessage.error(error.data.msg)
                        break
                    case 503:
                        error.data.msg = '服务不可用';
                        ElMessage.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg = '网络超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 505:
                        error.data.msg = 'http版本不支持该请求';
                        ElMessage.error(error.data.msg)
                        break
                    default:
                        error.data.msg = `连接错误${error.response.status}`;
                        ElMessage.error(error.data.msg)
                }
            } else {
                error.data.msg = "连接到服务器失败";
                ElMessage.error(error.data.msg)
            }
            return Promise.reject(error)
        })
    }

    //http:localhost:8080/api/getUserId?id=10
    get<T = any>(url: string, pas?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(url, {
                params: pas,
                paramsSerializer: (pas) => {
                    return qs.stringify(pas)
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    //参数处理
    getParams(pas: any) {
        let _pas = "";
        if (Object.is(pas, null)) {
            _pas = ''
        } else {
            for (const key in pas) {
                if (pas.hasOwnProperty(key) && pas[key]) {
                    _pas += `${pas[key]}`
                }
            }
        }
        if (_pas) _pas = _pas.substring(0, _pas.length);
        return _pas;
    }

    //http:localhost:8080/api/getUserId/10
    getRestApi<T = any>(url: string, pas?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(this.getParams(pas) ?
                `${url}/${this.getParams(pas)}` : url)
                .then(res => {
                    resolve(res.data as any)
                }).catch(error => {
                reject(error)
            })
        })
    }

    post<T = any>(url: string, pas: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, pas, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    put<T = any>(url: string, pas: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.put<T>(url, pas, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    delete<T = any>(url: string, pas: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.delete<T>(this.getParams(pas) ? `${url}/${this.getParams(pas)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                reject(error)
            })
        })
    }

    //获取验证码
    getImage(url: string) {
        return this.instance.get(url)
    }

    //登录（发送 JSON，JwtAuthenticationFilter 用 Jackson 解析）
    login<T = any>(url: string, pas: LoginParam): Promise<Result<T>> {
        return new Promise(((resolve, reject) => {
            this.instance.post<T>(url, pas, {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                resolve(res as any)
            }).catch(error => {
                reject(error)
            })
        }))
    }
}

export default request;
