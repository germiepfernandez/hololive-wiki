import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Talent } from '../schema';

interface Props {
    talent: Talent;
    type: 'gen-page' | 'gen-section';
}

const list = [
    'Pavolia Reine',
    'Kureiji Ollie',
    'Hakos Baelz',
    'Ceres Fauna',
    'La+ Darknesss',
    'Minato Aqua',
    'Ookami Mio',
    'Nekomata Okayu',
    'Mano Aloe',
];

const TalentCard = ({ talent, type }: Props) => {
    const bgSize = list.findIndex((e: string) => e === talent.name) === -1 ? 'cover' : 'contain';

    return (
        <div className="relative h-96">
            <div
                className="absolute inline-block h-96 w-full rounded-lg bg-contain bg-center bg-no-repeat shadow-md lg:bg-cover"
                style={{
                    backgroundImage: `url('/character/${talent.icon}')`,
                    backgroundSize: type === 'gen-page' ? 'contain' : bgSize,
                }}
            />
            <div
                style={{ backgroundColor: talent.color }}
                className="absolute -z-[1] h-96 w-full rounded-lg  bg-gradient-to-b from-gray-400 via-gray-800 bg-center opacity-50"
            />
            <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-lg p-4">
                <p className="text-shadow mb-4 text-center text-2xl font-semibold text-white">
                    {talent.name}
                </p>
                <p className="text-shadow mb-4 text-xs font-semibold text-white">
                    {talent.originalName}
                </p>
                <div className="absolute bottom-5 flex w-full items-center justify-center">
                    {talent.socials.map((soc) => (
                        <div className="relative mr-2" key={soc.id}>
                            <Image
                                unoptimized
                                alt={soc.link}
                                height="30px"
                                width="30px"
                                className="rounded-full align-middle drop-shadow-lg"
                                src={soc.icon.url}
                            />
                            <a
                                href={soc.link}
                                target="_blank"
                                className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer"
                            ></a>
                        </div>
                    ))}
                </div>
            </div>
            <Link href={`/idol/${talent.slug}`}>
                <span className="absolute z-10 h-full w-full cursor-pointer" />
            </Link>
        </div>
    );
};

export default TalentCard;
