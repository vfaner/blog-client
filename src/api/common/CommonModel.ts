/**
 * 标签云
 */
export interface Cloud {
    x: number
    y: number
    z: number
    text: string
    color?: string
}

/**
 * 标签
 */
export interface Tag {
    name: string
    color?: string
}

export interface TagList {
    tags:Tag[]
}
