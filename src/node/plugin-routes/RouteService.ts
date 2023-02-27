/* eslint-disable prettier/prettier */
// 约定式路由服务模块
import fastGlob from 'fast-glob'; // 用于扫描文件
import { normalizePath } from 'vite'; // 用于规范化路径
import path from 'path'; // 用于处理路径

interface RouteMeta {
  routePath: string;
  absolutePath: string;
}

export class RouteService {
  #scanDir: string; // 扫描目录
  #routeData: RouteMeta[] = []; // 初始化
  // 构造函数
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }

  async init() {
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir, // 从哪个目录开始扫描
        absolute: true, // 返回绝对路径
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts'] // 忽略的文件
      })
      .sort(); // 1. 扫描文件
    files.forEach((file) => {
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      ); // 2. 获取文件相对路径
      const routePath = this.normalizeRoutePath(fileRelativePath); // 3. 规范化路由路径
      this.#routeData.push({
        routePath,
        absolutePath: file
      }); // 4. 将路由路径和文件绝对路径存储到 routeData 中
    });
  }

  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  } // 返回路由元数据,方便测试

  normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  } // 函数用于规范化路由路径

  // loadable 用于实现按需加载，文档位置：https://loadable-components.com/docs/getting-started/
  generateRoutesCode(ssr = false) {
    return `
import React from 'react';
${ssr ? '' : 'import loadable from "@loadable/component";'}


${this.#routeData
        .map((route, index) => {
          return ssr
            ? `import Route${index} from "${route.absolutePath}";`
            : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
        })
        .join('\n')}
export const routes = [
  ${this.#routeData
        .map((route, index) => {
          return `{ path: '${route.routePath}', element: React.createElement(Route${index}), preload: () => import('${route.absolutePath}') }`;
        })
        .join(',\n')}
];
`;
  }
}
