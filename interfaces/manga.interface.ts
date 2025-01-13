export interface MangaTagAttributes {
    name: {
        en: string;
        vi?: string;
        ja?: string;
        "ja-ro"?: string;
    };
    description: Record<string, string>;
    group: string;
    version: number;
}

export interface MangaTag {
    id: string;
    type: "tag";
    attributes: MangaTagAttributes;
    relationships: any[]; // If you need to define relationships, you can do it further
}

export interface MangaLinks {
    al: string;
    ap: string;
    bw: string;
    mu: string;
    amz: string;
    cdj: string;
    ebj: string;
    mal: string;
    raw: string;
}

export interface MangaAttributes {
    title: {
        en: string;
    };
    altTitles: {
        vi?: string;
        en?: string;
        ja?: string;
        "ja-ro"?: string;
    }[];
    description: {
        en: string;
    };
    isLocked: boolean;
    links: MangaLinks;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string;
    status: string;
    year: number;
    contentRating: string;
    tags: MangaTag[];
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
}

export interface MangaRelationship {
    id: string;
    type: string;
    attributes: {
        description: string,
        volume: string,
        fileName: string,
        locale: string,
        createdAt: string,
        updatedAt: string,
        version: string
    }
}

export interface MangaData {
    id: string;
    type: "manga";
    attributes: MangaAttributes;
    relationships: MangaRelationship[];
}

export type MangaResponse = MangaData[];
