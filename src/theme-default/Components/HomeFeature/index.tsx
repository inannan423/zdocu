/* eslint-disable prettier/prettier */
import { Feature } from 'shared/types';

export function HomeFeature(props: { features: Feature[] }) {
    return (
        <div className="px-24 m-auto flex flex-wrap justify-between">
            {props.features.map((feature) => {
                const { icon, title, details } = feature;
                return (
                    <div key={title} border="rounded-md transparent" p="r-4 b-4" w="1/3">
                        <article
                            bg="bg-soft"
                            border="~ bg-soft solid rounded-xl"
                            p="6"
                            h="full"
                        >
                            <div
                                bg="gray-light-4 dark:bg-white"
                                border="rounded-md"
                                className="mb-5 w-12 h-12 text-3xl flex-center"
                            >
                                {icon}
                            </div>
                            <h2 font="bold">{title}</h2>
                            <p text="sm text-2" font="medium" className="pt-2 leading-6">
                                {details}
                            </p>
                        </article>
                    </div>
                );
            })}
        </div>
    );
}
