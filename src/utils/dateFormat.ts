/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return ''
    const d = date instanceof Date ? date : new Date(date)
    if (isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}
