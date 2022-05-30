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

export const getGenerationsFromBranchExcept = async (
    slug: string[] = [],
    branchSlug: string = '',
) => {
    const query = gql`
        query GetGenerationsFromBranchExcept($slug: [String!], $branchSlug: String!) {
            generations(where: { branch: { slug: $branchSlug }, slug_not_in: $slug }) {
                name
                slug
            }
        }
    `;

    const results: GraphQLFetchResponse<Generation[]> = await request(graphqlAPI, query, {
        slug,
        branchSlug,
    });
    return results.generations;
};
