import cac from 'cac';
import { resolve } from 'path';
import { build } from './build';
import { resolveConfig } from './config';

const cli = cac('zdocu').version('0.0.1').help();

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const createServer = async () => {
    // createDevServer 方法会返回一个 vite server，便于配置文件的热更新时重启服务
    const { createDevServer } = await import('./dev.js');
    const server = await createDevServer(root, async () => {
      await server.close(); // 先关闭服务
      await createServer(); // 重新创建服务，这样之后的配置文件修改就会生效了
    });
    await server.listen(); // 监听服务
    server.printUrls(); // 打印服务地址,vite 方法
  };
  await createServer(); // 调用 createServer 方法
});

cli
  .command('build [root]', 'build in production')
  .action(async (root: string) => {
    try {
      root = resolve(root);
      const config = await resolveConfig(root, 'build', 'production'); // 解析用户配置文件，将会返回具体内容
      await build(root, config);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
