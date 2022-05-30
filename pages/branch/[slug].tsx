import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { Branch, Generation } from '../../schema';
import { GenerationSection } from '../../section';
import { getBranches, getGenerationsFromBranch } from '../../services';
import { Loader } from '../../components';

interface Props {
    generations: Generation[];
}

const BranchPage = ({ generations = [] }: Props) => {
    return (
        <>
            <Loader />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-12">
                    {generations.map((gen) => {
                        if (gen.talents && gen.talents.length > 0) {
                            return <GenerationSection gen={gen} key={gen.name} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
};

export default BranchPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let branch: Branch | null = null;
    if (params && params.slug) {
        branch = await getGenerationsFromBranch(params.slug ?? '');
    }

    return {
        props: { generations: branch?.generations },
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const branches = await getBranches();
    return {
        paths: branches.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};
