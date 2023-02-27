/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { AttributifyAttributes } from 'unocss/preset-attributify';

declare module 'react' {
    interface HTMLAttributes<T> extends AttributifyAttributes { }
}