/* eslint-disable @typescript-eslint/ban-ts-comment */
import { routes } from 'zdocu:routes';
import { matchRoutes } from 'react-router-dom';
import { PageData } from 'shared/types';
import { Layout } from '../theme-default';
import siteData from 'zdocu:site-data';

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath);

  if (matched) {
    // Preload route component
    const moduleInfo = await matched[0].route.preload();
    console.log(moduleInfo);
    return {
      pageType: 'doc',
      siteData,
      // @ts-ignore
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}

export function App() {
  return <Layout />;
}