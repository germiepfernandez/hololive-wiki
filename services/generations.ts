import { request, gql } from 'graphql-request';
import { Generation, GraphQLFetchResponse } from '../schema';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';
export const getGenerations = async () => {
    const query = gql`
        query GetGenerations {
            generations {
                name
                slug
            }
        }
    `;

    const results: GraphQLFetchResponse<Generation[]> = await request(graphqlAPI, query);
    return results.generations;
};

export const getGenerationTalent = async () => {
    const query = gql`
        query GetGenerationTalent {
            generations {
                name
                slug
                talents {
                    name
                    originalName
                    socials {
                        ... on Social {
                            id
                            link
                            icon {
                                url
                            }
                        }
                    }
                    arts
                }
            }
        }
    `;

    const results: GraphQLFetchResponse<Generation[]> = await request(graphqlAPI, query);
    return results.generations;
};
