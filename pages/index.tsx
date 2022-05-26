import Head from 'next/head';
import type { GetStaticProps } from 'next';

import GenerationCard from '../components/GenerationCard';
import { Generation } from '../schema';
import { getGenerationTalent } from '../services';

interface Props {
    generations: Generation[];
}

const Home = ({ generations }: Props) => {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Head>
                <title>Hololive</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto mb-8 px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-12">
                        {generations.map((gen) => (
                            <GenerationCard gen={gen} key={gen.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const generations = (await getGenerationTalent()) || [];

    return {
        props: { generations },
    };
};
