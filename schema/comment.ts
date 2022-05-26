import { GraphQLData } from './common';

export interface Comment extends GraphQLData {
    name: string;
    email: string;
    comment: string;
}