import React from 'react';
import moment from 'moment';
import Carousel from 'react-multi-carousel';

import { Talent } from '../schema';
import { ElementNode, Text } from '../schema/graphcms/rich-text-types';

interface Props {
    talent?: Talent;
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

const TalentDetail = ({ talent }: Props) => {
    const getContentFragment = (
        index: number,
        text: string | JSX.Element | null,
        obj: ElementNode | Text,
        type: string,
        children: (string | JSX.Element | null)[] = [],
    ) => {
        let modifiedText = text;

        if (obj) {
            if (obj.bold) {
                modifiedText = <b key={index}>{text}</b>;
            }

            if (obj.italic) {
                modifiedText = <em key={index}>{text}</em>;
            }

            if (obj.underline) {
                modifiedText = <u key={index}>{text}</u>;
            }
        }

        switch (type) {
            case 'heading-two':
                return (
                    <h2 key={index} className="mb-4 text-xl font-semibold">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h2>
                );
            case 'heading-three':
                return (
                    <h3 key={index} className="mb-4 text-xl font-semibold">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h3>
                );
            case 'heading-four':
                return (
                    <h4 key={index} className="text-md mb-4 font-semibold">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h4>
                );
            case 'image':
                if ('title' in obj) {
                    return (
                        <img
                            key={index}
                            alt={obj.title}
                            height={obj.height}
                            width={obj.width}
                            src={obj.src}
                        />
                    );
                }
            case 'paragraph':
                return (
                    <p key={index} className="mb-8">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </p>
                );
            default:
                return modifiedText;
        }
    };

    const getFeaturedArt = (talent: Talent | null = null) => {
        if (!talent) return null;

        if (talent.featuredVideo) {
            return <video loop autoPlay muted src={talent?.featuredVideo} />;
        } else if (talent.featuredImage?.includes('https')) {
            return (
                <img
                    key={talent?.arts[0]}
                    src={`${talent?.featuredImage}`}
                    alt={talent?.name}
                    className=" w-full rounded-t-lg object-contain"
                />
            );
        } else {
            return (
                <img
                    key={talent?.arts[0]}
                    src={`/arts/${talent?.featuredImage}`}
                    alt={talent?.name}
                    className=" w-full rounded-t-lg object-contain"
                />
            );
        }
    };
    return (
        <div className="mb-8 rounded-lg bg-white bg-opacity-75 pb-12 shadow-lg lg:p-8">
            <div className="relative mb-6 overflow-hidden shadow-md">
                {/* {talent?.arts.map((art) => (
                    <img
                        key={art}
                        src={`/arts/${art}`}
                        alt={talent?.name}
                        className=" w-full rounded-t-lg object-contain"
                    />
                ))} */}
                {getFeaturedArt(talent)}
            </div>
            <div className="px-4 lg:px-0">
                <div className="mb-8 flex w-full items-center">
                    <div className="item-center mb-4 mr-8 flex w-full lg:mb-0 lg:w-auto">
                        {talent?.generations.map((gen, i) => (
                            <React.Fragment key={gen.slug}>
                                <p className="ml-2 inline align-middle text-lg text-gray-700">
                                    {gen.name}
                                </p>
                                {i !== talent.generations.length - 1 && <p className="ml-2">|</p>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 inline h-6 w-6 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{moment(talent?.debut).format('MMM DD, YYYY')}</span>
                    </div>
                </div>
                <h1 className="mb-2 text-3xl font-semibold">{talent?.name}</h1>
                <h2 className="font-md mb-8 text-lg">{talent?.originalName}</h2>
                {talent?.bio?.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) =>
                        getContentFragment(itemIndex, item.text, item, ''),
                    );

                    return getContentFragment(index, null, typeObj, typeObj.type, children);
                })}
            </div>
        </div>
    );
};

export default TalentDetail;
