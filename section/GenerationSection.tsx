import React from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';

import TalentCard from '../components/TalentCard';
import { Generation } from '../schema';

interface Props {
    gen: Generation;
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 768, min: 640 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

const GenerationSection = ({ gen }: Props) => {
    const customLeftArrow = (
        <div className="arrow-btn absolute left-0 cursor-pointer rounded-full bg-cyan-400 py-3 text-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-full text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
        </div>
    );

    const customRightArrow = (
        <div className="arrow-btn absolute right-0 cursor-pointer rounded-full bg-cyan-400 py-3 text-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-full text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
            </svg>
        </div>
    );

    return (
        <div className="mb-8 rounded-lg bg-black bg-opacity-20 p-6 pb-12 shadow-lg">
            <h3 className="cursor:pointer mb-8 text-2xl font-semibold text-white transition duration-100 hover:text-cyan-700">
                <Link href={`/generation/${gen.slug}`}>{gen.name}</Link>
            </h3>

            <div>
                <Carousel itemClass="px-4" responsive={responsive}>
                    {gen.talents?.map((talent) => (
                        <TalentCard type="gen-section" talent={talent} key={talent.name} />
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default GenerationSection;
