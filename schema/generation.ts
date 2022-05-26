import { Branch } from './branch';
import { GraphQLData } from './common';
import { Talent } from './talent';

export interface Generation extends GraphQLData  {
    name: string;
    slug: string;
    branch?: Branch;
    talents?: Talent[];
}
