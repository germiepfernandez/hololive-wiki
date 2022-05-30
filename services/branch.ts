import { request, gql } from 'graphql-request';
import { Branch, GraphQLConnectionResponse, GraphQLFetchResponse } from '../schema';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';
export const getBranches = async () => {
    const query = gql`
        query GetBranches {
            branches {
                name
                slug
            }
        }
    `;

    const results: GraphQLFetchResponse<Branch[]> = await request(graphqlAPI, query);
    return results.branches;
};

export const getGenerationsFromBranch = async (slug: string | string[]) => {
    const query = gql`
        query GetBranches($slug: String!) {
            branch(where: { slug: $slug }) {
                name
                slug
                generations {
                    name
                    slug
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
        }
    `;

    const results: GraphQLFetchResponse<Branch> = await request(graphqlAPI, query, { slug });
    return results.branch;
};

