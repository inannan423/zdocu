import { Plugin } from 'vite';
import { RouteService } from './RouteService';
import { PageModule } from 'shared/types';

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
  preload: () => Promise<PageModule>;
}

interface PluginOptions {
  root: string;
  isSSR: boolean;
}

export const CONVENTIONAL_ROUTE_ID = 'zdocu:routes'; // 用于 vite 插件，虚拟模块，便于 UI 组件访问配置文件中的数据

export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root);

  return {
    name: 'zdocu:routes',
    async configResolved() {
      await routeService.init();
    },
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + id; // Vite 模块约定，以 \0 开头的模块为虚拟模块
      }
    },

    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode(options.isSSR);
      }
    }
  };
}
