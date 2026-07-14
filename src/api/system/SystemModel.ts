//手机版底部导航项
export interface MobileNav {
    icon: string;
    title: string;
    link: string;
}
//系统配置信息
export interface ConfigModel {
    name: string;
    author: string;
    version: string;
    compatibility: string;
    title: string;
    keyword: string;
    description: string;
    logo: string;
    favicon: string;
    card: string;
    card1: string;
    card2: string;
    advisory: string;
    adv: [];
    mobileNavEnable?: boolean;
    mobileNavs?: MobileNav[];
}
