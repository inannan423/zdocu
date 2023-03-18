import { jsx, Fragment } from "react/jsx-runtime";
const frontmatter = {
  "pageType": "home",
  "hero": {
    "name": "zdocu",
    "text": "\u57FA\u4E8E Vite & MDX \u8BED\u6CD5\u7684\u9759\u6001\u7AD9\u70B9\u751F\u6210\u5668",
    "tagline": "\u7B80\u5355\u3001\u5F3A\u5927\u3001\u9AD8\u6027\u80FD\u7684\u73B0\u4EE3\u5316 SSG \u65B9\u6848",
    "image": {
      "src": "/logo.svg",
      "alt": "zdocu"
    },
    "actions": [{
      "theme": "brand",
      "text": "\u5FEB\u901F\u5F00\u59CB",
      "link": "/zh/guide/getting-started"
    }, {
      "theme": "alt",
      "text": "GitHub \u5730\u5740",
      "link": "https://github.com/sanyuan0704/zdocu"
    }]
  },
  "features": [{
    "title": "Vite: \u6781\u901F\u7684\u5F00\u53D1\u54CD\u5E94\u901F\u5EA6",
    "details": "\u57FA\u4E8E Vite \u6784\u5EFA\uFF0C\u5F00\u53D1\u65F6\u7684\u54CD\u5E94\u901F\u5EA6\u6781\u5FEB\uFF0C\u5373\u65F6\u7684\u70ED\u66F4\u65B0\uFF0C\u5E26\u7ED9\u4F60\u6781\u81F4\u7684\u5F00\u53D1\u4F53\u9A8C\u3002",
    "icon": "\u{1F680}"
  }, {
    "title": "MDX: Markdown & React \u7EC4\u4EF6\u6765\u5199\u5185\u5BB9",
    "details": "MDX \u662F\u4E00\u79CD\u5F3A\u5927\u7684\u65B9\u5F0F\u6765\u5199\u5185\u5BB9\u3002\u4F60\u53EF\u4EE5\u5728 Markdown \u4E2D\u4F7F\u7528 React \u7EC4\u4EF6\u3002",
    "icon": "\u{1F4E6}"
  }, {
    "title": "TypeScript: \u4F18\u79C0\u7684\u7C7B\u578B\u652F\u6301",
    "details": "\u4F7F\u7528 TypeScript \u7F16\u5199\uFF0C\u63D0\u4F9B\u4E86\u4F18\u79C0\u7684\u7C7B\u578B\u652F\u6301\uFF0C\u8BA9\u4F60\u7684\u5F00\u53D1\u66F4\u52A0\u987A\u7545\u3002",
    "icon": "\u{1F511}"
  }]
};
const toc = [];
function _createMdxContent(props) {
  return jsx(Fragment, {});
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, Object.assign({}, props, {
    children: jsx(_createMdxContent, props)
  })) : _createMdxContent();
}
export {
  MDXContent as default,
  frontmatter,
  toc
};
