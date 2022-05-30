import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Branch, Talent } from '../../schema';
import { GenerationCard, Loader, TalentDetail, TalentWidget } from '../../components';
import { getTalents, getTalentDetail } from '../../services';
import { AdjacentTalents } from '../../section';

interface Props {
    talent?: Talent;
    branch?: Branch;
    slug?: string;
    genSlugs?: string[];
    createdAt: string;
}

const IdolPage = ({ talent, branch, slug = '', genSlugs = [], createdAt }: Props) => {
    return (
        <>
            <Loader />
            <div className="container mx-auto mb-8 px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-8">
                        <TalentDetail talent={talent} />
                        <AdjacentTalents
                            slug={talent?.slug}
                            genSlug={genSlugs}
                            createdAt={createdAt}
                        />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative top-8 lg:sticky">
                            <TalentWidget gen={genSlugs} slug={slug} />
                            <GenerationCard branch={branch} genSlugs={genSlugs} />
                            {/* <Categories /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IdolPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let talent: Talent | null = null;

    // return { props: {} };
    if (params && params.slug) {
        talent = await getTalentDetail(params.slug ?? '');
    }

    return {
        props: {
            talent: talent,
            slug: talent?.slug,
            branch: talent?.branch ?? { name: '', slug: '' },
            genSlugs: talent?.generations.map((e) => e.slug),
            createdAt: talent?.createdAt,
        },
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const talents = await getTalents();

    return {
        paths: talents.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};
