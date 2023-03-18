/* eslint-disable prettier/prettier */
import { SidebarGroup, SidebarItem } from 'shared/types';
import styles from './index.module.scss';
import { Link } from '../Link/index';
interface SidebarProps {
    sidebarData: SidebarGroup[];
    pathname: string;
}

export function Sidebar(props: SidebarProps) {
    const { sidebarData, pathname } = props;

    const renderGroupItem = (item: SidebarItem) => {
        const active = item.link === pathname;
        return (
            <div>
                <div
                    className={`${active ? 'text-black dark:text-white underline decoration-brand decoration-dashed decoration-2 underline-offset-8' : 'text-text-2 decoration-[0px]'} block text-base font-medium py-1 transition-all ease-in-out duration-900`}
                >
                    <Link href={item.link}>{item.text}</Link>
                </div>
            </div>
        );
    };

    const renderGroup = (item: SidebarGroup) => {
        return (
            // not-first:divider-top 
            <section key={item.text} className="block mt-4">
                <div flex="~" justify="between" items="center">
                    <h2 m="t-3 b-2" text="1rem text-1" font="bold">
                        {item.text}
                    </h2>
                </div>
                <div className='mb-1'>
                    {item.items?.map((item) => (
                        <div key={item.link}>{renderGroupItem(item)}</div>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <aside className={`${styles.sidebar} !bg-white dark:!bg-black !pl-24`} >
            <nav>{sidebarData.map(renderGroup)}</nav>
        </aside >
    );
}
