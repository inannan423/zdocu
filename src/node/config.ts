// 解析用户配置文件  ../shared/types/index.ts
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { SiteConfig, UserConfig } from '../shared/types/index';

// RawConfig 为用户配置文件的类型，支持三种情况:
// 1. object
// 2. promise
// 3. function

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>); // 函数既可以返回一个对象也可以返回一个 promise

// 获取用户配置文件路径
function getConfigFilePath(root: string) {
  try {
    const supportConfigFiles = ['config.ts', 'config.js']; // 支持 js、ts 格式
    // 探测配置文件及其类型
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync); // find 方法用于检查数组中是否存在满足条件的元素，如果存在则返回第一个满足条件的元素，否则返回 undefined
    return configPath; // 返回配置文件路径
  } catch (e) {
    console.error(`Oh!Failed to load user config: ${e}`); // 当不存在配置文件时，打印错误信息
    throw e;
  }
}

// 解析用户配置文件
// return [configPath, userConfig] as const; 即返回一个元组，第一个元素为用户配置文件路径，第二个元素为用户配置文件内容
export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) {
  // 找到用户配置文件路径
  const configPath = getConfigFilePath(root);
  // 加载用户配置文件，接收三个参数:
  // 1. command: serve | build 两种命令
  // 2. mode: development | production 两种模式
  // 3. configPath: 用户配置文件路径
  // 4. root: 项目根目录
  const result = await loadConfigFromFile({ command, mode }, configPath, root);
  // Vite 自带的 loadConfigFromFile 方法，用于加载用户配置文件，文档位置：https://cn.vitejs.dev/guide/api-javascript.html#loadconfigfromfile

  // 解析 Vite 读取到的结果
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    // rawConfig 三种情况:
    // 1. object
    // 2. promise 即有可能用户配置文件中返回的是一个 promise
    // 3. function
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig); // 当是函数的时候调用一下，否则直接返回
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

// 解析用户配置文件中的 siteData，如果用户没有配置，则使用默认值
export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'zdocu',
    description:
      userConfig.description || 'A React-vite-powered Static Site Generator',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}

// 解析用户配置文件
export async function resolveConfig(
  root: string, // 项目根目录
  command: 'serve' | 'build', // 命令
  mode: 'development' | 'production' // 模式
): Promise<SiteConfig> {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  const siteConfig: SiteConfig = {
    root,
    // @ts-ignore
    configPath: configPath,
    siteData: resolveSiteData(userConfig as UserConfig) // 解析用户配置文件中的 siteData
  };
  return siteConfig;
}

// 返回用户配置文件解析后的结果
export function defineConfig(config: UserConfig): UserConfig {
  return config;
}
