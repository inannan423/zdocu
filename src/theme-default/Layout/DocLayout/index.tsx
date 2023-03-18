/* eslint-disable prettier/prettier */
import { usePageData, Content } from '@runtime';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../Components/Sidebar/index';
import styles from './index.module.scss';
import { DocFooter } from '../../Components/DocFooter/index';
import { Aside } from '../../Components/Aside';

export function DocLayout() {
    const { siteData, toc } = usePageData();
    const sidebarData = siteData.themeConfig?.sidebar || {};
    const { pathname } = useLocation();
    const matchedSidebarKey = Object.keys(sidebarData).find((key) => {
        if (pathname.startsWith(key)) {
            return true;
        }
    });

    // @ts-ignore
    const matchedSidebar = sidebarData[matchedSidebarKey] || [];

    return (
        <div>
            <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
            <div className={`${styles.content}`} flex="~">
                <div className={styles.docContent}>
                    <div className="zdocu-doc">
                        <Content />
                    </div>
                    <DocFooter />
                </div>
                <div className={`${styles.asideContainer}`}>
                    {/* @ts-ignore */}
                    <Aside headers={toc} __island />
                </div>
            </div>
        </div>
    );
}
