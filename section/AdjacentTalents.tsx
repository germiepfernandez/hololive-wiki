import React, { useState, useEffect } from 'react';

import { AdjacentTalentCard } from '../components';
import { AjacentTalent } from '../schema';
import { getAdjacentTalent } from '../services';

interface Props {
    genSlug?: string[];
    slug?: string;
    createdAt?: string;
}
const AdjacentTalents = ({ genSlug = [], slug = '', createdAt = '' }: Props) => {
    const [adjacentTalent, setAdjacentTalent] = useState<AjacentTalent | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getAdjacentTalent(slug, genSlug, createdAt).then((result) => {
            setAdjacentTalent(result);
            setDataLoaded(true);
        });
    }, [slug]);

    return (
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-8">
            {dataLoaded && (
                <>
                    {adjacentTalent?.previous && (
                        <div
                            className={`${
                                adjacentTalent.next
                                    ? 'col-span-1 lg:col-span-4'
                                    : 'col-span-1 lg:col-span-8'
                            } adjacent-post relative h-72 rounded-lg`}
                        >
                            <AdjacentTalentCard talent={adjacentTalent.previous} position="LEFT" />
                        </div>
                    )}
                    {adjacentTalent?.next && (
                        <div
                            className={`${
                                adjacentTalent.previous
                                    ? 'col-span-1 lg:col-span-4'
                                    : 'col-span-1 lg:col-span-8'
                            } adjacent-post relative h-72 rounded-lg`}
                        >
                            <AdjacentTalentCard talent={adjacentTalent.next} position="RIGHT" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdjacentTalents;
