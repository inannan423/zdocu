import { defineConfig } from '../dist/index';

export default defineConfig({
  title: "xxx",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/guide/" },
    ],
  },
});