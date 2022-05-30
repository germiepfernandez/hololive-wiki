import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Branch, Generation } from '../schema';
import { getGenerationsFromBranchExcept } from '../services';

interface Props {
    branch?: Branch;
    genSlugs: string[];
}

const GenerationCard = ({ genSlugs, branch }: Props) => {
    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        getGenerationsFromBranchExcept(genSlugs, branch?.slug).then((result) =>
            setGenerations(result ?? []),
        );
    }, []);

    return (
        <div className="mb-8 rounded-lg bg-white bg-opacity-75 p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold text-black">Generations</h3>
            {generations.map((gen) => (
                <Link key={gen.slug} href={`/generation/${gen.slug}`}>
                    <span className="mb-3 block w-auto cursor-pointer pb-3 text-black hover:border-b-2 hover:border-b-cyan-700">
                        {gen.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default GenerationCard;
