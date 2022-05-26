import { GraphQLData } from './common';
import { Generation } from './generation';

export interface Branch extends GraphQLData  {
    name: string;
    slug: string;
    generations?: Generation[];
}
