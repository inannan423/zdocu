// 通用配置器，便于用户自定义配置
import { UserConfig as ViteConfiguration } from 'vite';

// NavItemWithLink 用于导航栏
export type NavItemWithLink = {
  text: string;
  link: string;
};

// Sidebar 用于侧边栏，侧边栏的 key 为路由路径，value 为侧边栏组
export interface Sidebar {
  [path: string]: SidebarGroup[];
}

// SidebarGroup 用于侧边栏组
export interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
}

// SidebarItem 用于侧边栏组中的侧边栏项
export type SidebarItem =
  | { text: string; link: string }
  | { text: string; link?: string; items: SidebarItem[] };

// 主题配置
export interface ThemeConfig {
  nav?: NavItemWithLink[];
  sidebar?: Sidebar;
  footer?: Footer;
}

// 页脚配置
export interface Footer {
  message?: string;
  copyright?: string;
}

// 用户信息配置
export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration;
}

// 站点配置
export interface SiteConfig {
  root: string;
  configPath: string;
  siteData: UserConfig; // 站点相关的配置
}

export type PageType = 'home' | 'doc' | 'custom' | '404';

export interface Header {
  id: string;
  text: string;
  depth: number;
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
}

export interface PageData {
  siteData: UserConfig;
  pagePath: string;
  frontmatter: FrontMatter;
  pageType: PageType;
  toc?: Header[];
}

import { ComponentType } from 'react';

export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  toc?: Header[];
  [key: string]: unknown;
}

export interface Feature {
  icon: string;
  title: string;
  details: string;
}

export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
  // 增加 features 和 hero 的类型
  features?: Feature[];
  hero?: Hero;
}
