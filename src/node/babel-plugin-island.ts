/* eslint-disable prettier/prettier */
import { declare } from '@babel/helper-plugin-utils';
// @ts-ignore
import type { Visitor } from '@babel/traverse';
// @ts-ignore
import type { PluginPass } from '@babel/core';
// @ts-ignore
import { types as t } from '@babel/core';
import { MASK_SPLITTER } from './constants';
import { normalizePath } from 'vite';

export default declare((api) => {
    api.assertVersion(7);

    const visitor: Visitor<PluginPass> = {
        // <A __island>
        // <A.B __island>
        JSXOpeningElement(path: { node: { name: any; }; scope: { getBinding: (arg0: string) => any; }; container: any; }, state: { filename: any; }) {
            const name = path.node.name;
            let bindingName = '';
            if (name.type === 'JSXIdentifier') {
                bindingName = name.name;
            } else if (name.type === 'JSXMemberExpression') {
                let object = name.object;
                // A.B.C
                while (t.isJSXMemberExpression(object)) {
                    object = object.object;
                }
                bindingName = object.name;
            } else {
                return;
            }

            const binding = path.scope.getBinding(bindingName);

            if (binding?.path.parent.type === 'ImportDeclaration') {
                const source = binding.path.parent.source;
                const attributes = (path.container as t.JSXElement).openingElement
                    .attributes;
                for (let i = 0; i < attributes.length; i++) {
                    const name = (attributes[i] as t.JSXAttribute).name;
                    if (name?.name === '__island') {
                        (attributes[i] as t.JSXAttribute).value = t.stringLiteral(
                            `${source.value}${MASK_SPLITTER}${normalizePath(
                                state.filename || ''
                            )}`
                        );
                    }
                }
            }
        }
    };

    return {
        name: 'transform-jsx-island',
        visitor
    };
});
