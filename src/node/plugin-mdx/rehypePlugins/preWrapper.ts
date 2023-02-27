import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

export const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 查找 pre 标签
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code' &&
        !node.data?.isVisited // 避免重复处理,插件返回的回调函数会针对每个 pre 标签执行，而在回调函数中我们又手动地追加了 pre 元素，因此又会增加一次遍历的过程，在新增的遍历过程中我们又追加了 pre 元素,这样就会导致死循环
      ) {
        const codeNode = node.children[0];
        const codeClassName = codeNode.properties?.className?.toString() || '';
        // 查找语言
        const lang = codeClassName.split('-')[1];

        const clonedNode: Element = {
          type: 'element',
          tagName: 'pre',
          children: node.children,
          data: {
            isVisited: true
          } // 添加 data 属性，避免重复处理
        };

        // 重写 pre 标签为 div
        node.tagName = 'div';
        node.properties = node.properties || {};
        node.properties.className = codeClassName;

        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang'
            },
            children: [
              {
                type: 'text',
                value: lang
              }
            ]
          },
          clonedNode
        ];
      }
    });
  };
};
