import {EmojiApi} from "undraw-ui";

export interface CommentSubmitParam {
    clear: () => void
    content: string
    parentId?: number | string
    articleId?: number | string
}
export interface ConfigApi {
    user: UserApi;
    emoji: EmojiApi;
    comments: CommentApi[];
}

export interface CommentApi {
    id?: number | string;
    parentId: string | null;
    uid: number | string;
    articleId?: number | string;
    username: string;
    avatar: string;
    level: number;
    link: string;
    address: string;
    content: string;
    like: number|string;
    createTime: string;
    reply?: ReplyApi | null;
    children?: any;
}

export interface UserApi {
    id: number | string;
    username: string;
    avatar: string;
    likeIds?: number[];
}

export interface ReplyApi {
    total: number;
    list: CommentApi[];
}

export interface ShowParam {
    articleId?: number | string;
    lazy: boolean;
    pid: number | string;
}
export interface CommentShow {
    id?: number | string;
    parentId: string | number;
    uid: number | string;
    articleId?: number | string;
    articleName?: string;
    username: string;
    avatar: string;
    level: number;
    link: string;
    address: string;
    content: string;
    like: number|string;
    createTime: string;
}
//评论查询
export interface CommentSearchParam {
    username: string;
    pageNum: number;
    pageSize: number;
}
