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
