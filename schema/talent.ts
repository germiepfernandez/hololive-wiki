import { GraphCMSImage, GraphCMSRichText, GraphQLData } from "./common";

interface Social {
    id: string;
    icon: GraphCMSImage;
    link: string;
}

export interface Talent extends GraphQLData {
    name: string;
    originalName?: string;
    debut?: string;
    bio?: GraphCMSRichText;
    arts: string[];
    icon?: GraphCMSImage;
    socials: Social[];
    slug: string;
}

export interface AjacentTalent {
    next: Talent;
    previous: Talent;
}