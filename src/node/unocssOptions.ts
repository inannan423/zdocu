/* eslint-disable prettier/prettier */
import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

const options: VitePluginConfig = {
    presets: [presetAttributify(), presetWind({}), presetIcons()],
    shortcuts: {
        'flex-center': 'flex justify-center items-center'
    },
    rules: [
        [
            /^divider-(\w+)$/,
            ([, w]) => ({
                [`border-${w}`]: '1px solid var(--zdocu-c-divider-light)'
            })
        ],
        [
            'menu-item-before',
            {
                'margin-right': '12px',
                'margin-left': '12px',
                width: '1px',
                height: '24px',
                'background-color': 'var(--zdocu-c-divider-light)',
                content: '" "'
            }
        ]
    ],
    theme: {
        colors: {
            brandLight: 'var(--zdocu-c-brand-light)',
            brandDark: 'var(--zdocu-c-brand-dark)',
            brand: 'var(--zdocu-c-brand)',
            text: {
                1: 'var(--zdocu-c-text-1)',
                2: 'var(--zdocu-c-text-2)',
                3: 'var(--zdocu-c-text-3)',
                4: 'var(--zdocu-c-text-4)'
            },
            divider: {
                default: 'var(--zdocu-c-divider)',
                light: 'var(--zdocu-c-divider-light)',
                dark: 'var(--zdocu-c-divider-dark)'
            },
            gray: {
                light: {
                    1: 'var(--zdocu-c-gray-light-1)',
                    2: 'var(--zdocu-c-gray-light-2)',
                    3: 'var(--zdocu-c-gray-light-3)',
                    4: 'var(--zdocu-c-gray-light-4)'
                }
            },
            bg: {
                default: 'var(--zdocu-c-bg)',
                soft: 'var(--zdocu-c-bg-soft)',
                mute: 'var(--zdocu-c-bg-mute)'
            }
        }
    }
};

export default options;
