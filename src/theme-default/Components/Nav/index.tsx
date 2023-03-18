/* eslint-disable prettier/prettier */
import styles from './index.module.scss';
import { NavItemWithLink } from 'shared/types';
import { usePageData } from '@runtime';
import { SwitchAppearance } from '../SwitchAppearance';

export function MenuItem({ item }: { item: NavItemWithLink }) {
    return (
        <div className="text-lg font-medium mx-3 h-max">
            <a href={item.link} className="text-base h-max flex justify-center items-center text-center font-normal hover:text-green-500 px-2 py-1 rounded-md hover:bg-gray-200 hover:bg-opacity-60 dark:hover:bg-opacity-10 transition-all ease-in-out duration-700">
                {item.text}
            </a>
        </div>
    );
}

export function Nav() {
    const { siteData } = usePageData();
    const nav = siteData.themeConfig?.nav || [];
    return (
        <header
            className="fixed top-0 left-0 w-full z-10 px-24 divider-bottom bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-30 backdrop-blur-md">
            <div
                className={'h-16 flex items-center justify-between '}
            >
                <div>
                    <div className='w-max flex justify-center items-center hover:opacity-60 transition-all ease-in-out duration-900'>
                        {
                            siteData.logo && (
                                <a
                                    href="/"
                                    className="w-14 h-14 flex items-center"
                                >
                                    <img src={siteData.logo} alt="logo" />
                                </a>
                            )
                        }
                        <a
                            href="/"
                            className="w-full h-full text-lg font-bold ml-1 text-center flex items-center"
                        >
                            {siteData.title}
                        </a>
                    </div>
                </div>
                {/* 普通菜单 */}
                <div className="flex">
                    {nav.map((item) => (
                        <MenuItem item={item} key={item.text} />
                    ))}
                </div>
                <div className='flex justify-between'>
                    {/* 白天/夜间模式切换 */}
                    <div flex="~">
                        <SwitchAppearance />
                    </div>

                    {/* 相关链接 */}
                    <div className={styles.socialLinkIcon} before="menu-item-before">
                        <a title='more' href="/">
                            <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
