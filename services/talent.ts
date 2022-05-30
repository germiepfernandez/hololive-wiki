import request, { gql } from 'graphql-request';
import { Generation, GraphQLFetchResponse, Talent } from '../schema';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';

export const getTalents = async () => {
    const query = gql`
        query GetTalents {
            talents {
                name
                slug
            }
        }
    `;

    const results: GraphQLFetchResponse<Talent[]> = await request(graphqlAPI, query);
    return results.talents;
};

export const getTalentDetail = async (slug: string | string[]) => {
    const query = gql`
        query GetTalentDetail($slug: String!) {
            talent(where: { slug: $slug }) {
                name
                originalName
                color
                icon
                debut
                slug
                arts
                createdAt
                featuredVideo
                featuredImage
                bio {
                    raw
                }
                socials {
                    ... on Social {
                        id
                        link
                        icon {
                            url
                        }
                    }
                }
                branch {
                    name
                    slug
                }
                generations {
                    name
                    slug
                }
            }
        }
    `;

    const results: GraphQLFetchResponse<Talent> = await request(graphqlAPI, query, { slug });
    return results.talent;
};

export const getTalentsFromGeneration = async (slug: string | string[]) => {
    const query = gql`
        query GetTalentsFromGeneration($slug: String!) {
            generation(where: { slug: $slug }) {
                name
                slug
                branch {
                    name
                    slug
                }
                talents {
                    name
                    originalName
                    slug
                    color
                    icon
                    arts
                    socials {
                        ... on Social {
                            id
                            link
                            icon {
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

    const results: GraphQLFetchResponse<Generation> = await request(graphqlAPI, query, { slug });
    return results.generation;
};

export const getRelatedTalents = async (slug: string, genSlug: string[]) => {
    const query = gql`
        query GetRelatedTalent($slug: String!, $genSlug: [String!]) {
            talents(where: { slug_not: $slug, AND: { generations_some: { slug_in: $genSlug } } }) {
                name
                slug
                debut
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug, genSlug });
    return result.talents;
};
export const getAdjacentTalent = async (slug: string, genSlug: string[], createdAt: string) => {
    const query = gql`
        query GetAdjacentTalent($slug: String!, $genSlug: [String!], $createdAt: DateTime!) {
            next: talents(
                first: 1
                orderBy: createdAt_ASC
                where: {
                    slug_not: $slug
                    AND: { generations_every: { slug_in: $genSlug }, createdAt_lte: $createdAt }
                }
            ) {
                name
                originalName
                slug
                color
                icon
                arts
            }
            previous: talents(
                first: 1
                orderBy: createdAt_DESC
                where: {
                    slug_not: $slug
                    AND: { generations_every: { slug_in: $genSlug }, createdAt_lte: $createdAt }
                }
            ) {
                name
                originalName
                slug
                color
                icon
                arts
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug, genSlug, createdAt });

    return { next: result.next[0], previous: result.previous[0] };
};
