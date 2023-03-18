// 注册公共的插件
import {pluginIndexHtml} from './plugin-zdocu/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import {pluginConfig} from './plugin-zdocu/config';
import {pluginRoutes} from './plugin-routes';
import {SiteConfig} from 'shared/types';
import {pluginMdx} from './plugin-mdx';
import pluginUnocss from 'unocss/vite';
import {PACKAGE_ROOT} from './constants';
import unocssOptions from './unocssOptions';
import path from 'path';
import babelPluginIsland from './babel-plugin-island';

export async function createVitePlugins(
    config: SiteConfig,
    restartServer?: () => Promise<void>,
    isSSR = false
) {
    return [
        // unocss 必须放在最前面
        pluginUnocss(unocssOptions),
        pluginIndexHtml(),
        pluginReact({
            jsxRuntime: 'automatic',
            jsxImportSource: isSSR
                ? path.join(PACKAGE_ROOT, 'src', 'runtime')
                : 'react',
            babel: {
                plugins: [babelPluginIsland]
            }
        }),
        pluginConfig(config, restartServer),
        pluginRoutes({
            root: config.root,
            isSSR
        }),
        await pluginMdx()
    ];
}
