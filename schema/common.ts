import { RichTextContent } from './graphcms/rich-text-types';

export interface GraphQLData {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GraphQLFetchResponse<T> {
    [key: string]: T;
}

export interface GraphQLConnectionResponse<T> {
    [key: string]: {
        edges: Array<{ node: T }>;
    };
}

export interface GraphCMSImage {
    url: string;
}

type RichTextType =
    | 'bulleted-list'
    | 'numbered-list'
    | 'list-item'
    | 'list-item-child'
    | 'table'
    | 'table_head'
    | 'table_body'
    | 'table_row'
    | 'table_cell'
    | 'table_header_cell'
    | 'block-quote'
    | 'paragraph'
    | 'heading-one'
    | 'heading-two'
    | 'heading-three'
    | 'heading-four'
    | 'heading-five'
    | 'heading-six'
    | 'class'
    | 'link'
    | 'image'
    | 'video'
    | 'iframe'
    | 'embed'
    | 'code-block';

export interface Text {
    text: string;
}

export interface Link {
    children: Text[];
    className: string;
    href: string;
    openInNewTab: boolean;
    rel: string;
    type: RichTextType;
    text?: string;
}

// export interface RichTextContent {
//     type: RichTextType;
//     children: Array<Text | Link>;
// }

// export interface GraphCMSRichText {
//     raw: {
//         children: Array<Text | Link | RichTextContent>;
//     };
// }

export interface GraphCMSRichText {
    raw: RichTextContent;
}
