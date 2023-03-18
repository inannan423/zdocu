// 全局类型声明
declare module 'zdocu:site-data' {
  // 虚拟模块的类型声明
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}


declare module 'zdocu:routes' {
  import type { Route } from 'node/plugin-routes';
  export const routes: Route[];
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}


