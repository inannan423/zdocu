/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import { usePageData } from '@runtime';
import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeature/index';

export function HomeLayout() {
    const { frontmatter } = usePageData();
    return (
        <div>
            {/* @ts-ignore */}
            <HomeHero hero={frontmatter.hero} />
            {/* @ts-ignore */}
            <HomeFeature features={frontmatter.features} />
        </div>
    );
}
