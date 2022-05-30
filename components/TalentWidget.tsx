import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Talent } from '../schema';
import { getRelatedTalents } from '../services';

interface Props {
    slug?: string;
    gen?: string[];
}

const TalentWidget = ({ gen = [], slug = '' }: Props) => {
    const [relatedTalent, setRelatedTalent] = useState<Talent[]>([]);

    useEffect(() => {
        getRelatedTalents(slug, gen).then((result) => setRelatedTalent(result));
    }, [slug]);

    return (
        <div className="mb-8 rounded-lg bg-white bg-opacity-75 p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Genmates</h3>
            {relatedTalent.map((talent) => {
                return (
                    <div key={talent.name} className="mb-4 flex w-full items-center">
                        {/* <div className="w-16 flex-none">
                            <img
                                alt={talent.title}
                                height="60px"
                                width="60px"
                                className="rounded-full align-middle"
                                src={talent.featuredImage.url}
                            />
                        </div> */}
                        <div className="ml-4 flex-grow">
                            <p className="text-xs text-gray-500">
                                {moment(talent.debut).format('MMM DD, YYYY')}
                            </p>
                            <Link href={`/idol/${talent.slug}`} className="text-md">
                                {talent.name}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TalentWidget;
