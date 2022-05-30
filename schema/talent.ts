import { Branch } from "./branch";
import { GraphCMSImage, GraphCMSRichText, GraphQLData } from "./common";
import { Generation } from "./generation";

interface Social {
    id: string;
    icon: GraphCMSImage;
    link: string;
}

export interface Talent extends GraphQLData {
    name: string;
    originalName?: string;
    color: string;
    icon: string;
    debut?: string;
    slug: string;
    arts: string[];
    bio?: GraphCMSRichText;
    socials: Social[];
    branch: Branch;
    generations: Generation[];
    featuredImage?: string;
    featuredVideo?: string;
}

export interface AjacentTalent {
    next: Talent;
    previous: Talent;
}