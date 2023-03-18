import { defineConfig } from '../dist';

export default defineConfig({
  title: 'zdocu',
  logo: '/logo.svg',
  footer: {
    message: `@ copyright ${new Date().getFullYear()} jetlab.Powered by zdocu`,
    media: [
      {
        icon: '/github.svg',
        link: 'https://github.com',
        name: 'github'
      },
      {
        icon: '/juejin.svg',
        link: 'https://juejin.cn',
        name: 'juejin'
      }
    ]
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    // 新增 sidebar 的内容
    sidebar: {
      '/guide/': [
        {
          text: '教程',
          items: [
            {
              text: '快速上手',
              link: '/guide/a'
            },
            {
              text: '如何安装',
              link: '/guide/b'
            },
            {
              text: '注意事项',
              link: '/guide/c'
            }
          ]
        },
        {
          text: '进阶',
          items: [
            {
              text: '高级配置',
              link: '/guide/c'
            },
          ]
        }
      ],
    }
  }
});