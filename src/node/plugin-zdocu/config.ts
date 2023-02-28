// vite 插件允许前端能访问配置文件中的数据
import path, { relative, join } from 'path';
import { normalizePath, Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { PACKAGE_ROOT } from '../constants';
import sirv from 'sirv';
import fs from 'fs-extra';

const SITE_DATA_ID = 'zdocu:site-data'; // 用于 vite 插件，虚拟模块，便于 UI 组件访问配置文件中的数据

export function pluginConfig(
  config: SiteConfig, // 用户配置文件
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: 'zdocu:config', // vite 插件名称
    config() {
      return {
        root: PACKAGE_ROOT, // vite 项目根目录
        resolve: {
          // alias: 别名
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly'
          }
        }
      };
    },
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID; // Vite 模块约定，以 \0 开头的模块为虚拟模块
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`; // 将用户配置文件中的 siteData 导出
      }
    },

    // 配置文件热更新，ctx：文件变化的上下文
    async handleHotUpdate(ctx) {
      console.log('watched path:' + config.configPath);
      // const customWatchedFiles = [config.configPath]; // 需要监听的文件
      // 改为：
      const customWatchedFiles = [normalizePath(config.configPath)]; // 需要监听的文件
      const include = (id: string) => {
        console.log('changed file s path:' + id);
        return customWatchedFiles.some((file) => id.includes(file));
      }; // 判断文件是否需要监听

      if (include(ctx.file)) {
        console.log(
          `\n🍊 ${relative(
            config.root,
            ctx.file
          )} changed, restarting server...`
        );
        // 重启服务，重新加载配置文件
        await restartServer!();
      }
    },
    configureServer(server) {
      const publicDir = join(config.root, 'public');
      server.middlewares.use(sirv(publicDir));
    }
  };
}
