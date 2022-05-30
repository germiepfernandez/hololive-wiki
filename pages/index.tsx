import Head from 'next/head';
import Image from 'next/image';
import type { GetStaticProps } from 'next';

import { Branch, Generation } from '../schema';
import { Loader } from '../components';
import logo from '../public/hololive_logo.png';
import hololive from '../public/hololive.png';
import Link from 'next/link';
import { getBranches } from '../services';

interface Props {
    branches: Branch[];
}

const Home = ({ branches }: Props) => {
    return (
        <>
            <Head>
                <title>Hololive</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Loader />

            <div className="flex flex-col items-center gap-20 lg:flex-row">
                <div className="col-span-1 lg:col-span-6">
                    <Image
                        src={hololive}
                        height={800}
                        width={900}
                        alt="Hololive Production"
                        className="align-middle"
                    />
                </div>
                <div className="col-span-1 flex max-w-md flex-col items-center justify-center lg:col-span-4">
                    <div className="mb-10 align-middle">
                        <Image src={logo} height={75} width={300} alt="Hololive Production" />
                    </div>
                    <p className="mb-10 text-center text-lg text-white">
                        With over 50,000,000 fans across all their channels, VTuber group hololive
                        is the all-female talent group that belongs to the VTuber agency hololive
                        production.
                    </p>
                    <h3 className="pb-4 text-xl font-semibold text-white">
                        Check out talents from different branches.
                    </h3>
                    <div className="flex flex-col items-center gap-5 lg:flex-row">
                        {branches.map((cat) => (
                            <Link key={cat.slug} href={`/branch/${cat.slug}`}>
                                <span className="inline-block transform cursor-pointer rounded-full bg-cyan-700 px-8 py-3 text-lg font-semibold text-white transition duration-500 hover:-translate-y-1 hover:bg-cyan-500 ">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const branches = (await getBranches()) || [];

    return {
        props: { branches },
    };
};
