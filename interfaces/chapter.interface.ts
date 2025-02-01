import { MangaAttributes, ScanlationGroupAttributes } from "./manga.interface";

export interface ChapterData {
    baseUrl:string;
    chapter:ChapterFeed;
}

interface ChapterFeed {
    hash:string;
    data:string[];
    dataSaver:string[];
}

export interface ChapterDetails {
    attributes:ChapterDetailsAttributes;
    id:string;
    relationships:ChapterDetailsRelationships[];
    type:string;
}

interface ChapterDetailsAttributes {
    chapter:string;
    createdAt:string;
    externalUrl:string;
    pages:number;
    publishAt:string;
    readableAt:string;
    title:string;
    translatedLanguage:string;
    updatedAt:string;
    version:number;
    volume:string;
}

export type ChapterDetailsRelationships= 
| { id:string; type: 'scanlation_group'; attributes: ScanlationGroupAttributes }
| { id:string; type: 'manga'; attributes: MangaAttributes };

