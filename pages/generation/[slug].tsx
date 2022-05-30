import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { Loader, TalentCard, GenerationCard } from '../../components';
import { Branch, Generation, Talent } from '../../schema';
import { getGenerations, getTalentsFromGeneration } from '../../services';

interface Props {
    talents: Talent[];
    name: string;
    slug: string;
    branch: Branch;
}

const GenerationPage = ({ talents = [], name, slug, branch }: Props) => {
    return (
        <>
            <Loader />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-9">
                    <h3 className="cursor:pointer mb-4 text-2xl font-semibold text-white transition duration-100 hover:text-cyan-700">
                        {name}
                    </h3>
                    <div className="grid grid-cols-1 gap-12 gap-y-4 lg:grid-cols-12">
                        {talents.map((talent) => (
                            <div key={talent.slug} className="col-span-1 lg:col-span-4">
                                <TalentCard type="gen-page" talent={talent} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-3">
                    <div className="relative top-8 lg:sticky">
                        <GenerationCard branch={branch} genSlugs={[slug]} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenerationPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let generation: Generation | null = null;
    if (params && params.slug) {
        generation = await getTalentsFromGeneration(params.slug ?? '');
    }

    return {
        props: {
            talents: generation?.talents,
            name: generation?.name,
            slug: generation?.slug,
            branch: generation?.branch,
        },
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const gens = await getGenerations();

    return {
        paths: gens.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};
