import http from "@/http/http"

enum Api {
    stats = 'rgh/api/dashboard/stats',
}

// 仪表盘统计概览
export const getDashboardStatsApi = async () => {
    return await http.get(Api.stats)
}
