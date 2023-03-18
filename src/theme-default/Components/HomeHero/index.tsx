/* eslint-disable prettier/prettier */
import { Hero } from 'shared/types';
import styles from './index.module.scss';
import { Button } from '../Button/index';
export function HomeHero(props: { hero: Hero }) {
    const { hero } = props;
    return (
        <div className="m-auto pt-20 px-24 pb-16">
            <div className="flex m-auto w-full">
                <div className="w-1/2 flex flex-col text-left">
                    <h1 className="w-full text-5xl font-bold font-sans my-2">
                        <span className={styles.clip}>{hero.name}</span>
                    </h1>
                    <p className="w-full text-5xl font-bold text-gray-600">
                        {hero.text}
                    </p>
                    <p
                        p="t-3"
                        text="2xl text-2"
                        font="medium"
                        className="whitespace-pre-wrap max-w-576px"
                    >
                        {hero.tagline}
                    </p>
                    <div flex="~ wrap" justify="start" p="t-8">
                        {hero.actions.map((action) => (
                            <div key={action.link} p="1">
                                <Button
                                    type="a"
                                    text={action.text}
                                    href={action.link}
                                    theme={action.theme}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {hero.image && (
                    <div w="max-96" h="max-96" flex="center" m="auto">
                        <img src={hero.image.src} alt={hero.image.alt} />
                    </div>
                )}
            </div>
        </div>
    );
}
