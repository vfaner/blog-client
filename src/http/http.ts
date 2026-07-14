import request from "@/http/request";

const http = new request({
    baseURL: import.meta.env.VITE_API_BASE || '/',
    timeout: 10000
})
export default http;
