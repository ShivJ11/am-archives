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
    altTitles: AltTitles[];
    description: {
        en: string;
    };
    isLocked: boolean;
    links: MangaLinks;
    originalLanguage: keyof AltTitles;
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
    state: string;
}
export interface AltTitles {
    vi?: string;
    en?: string;
    ja?: string;
    "ja-ro"?: string;
    ru?: string;
    "zh-hk": string;
    ko?: string;
    th?: string;
    el?: string;
    de?: string;
    "es-la"?: string;
}
export interface MangaRelationship {
    id: string;
    type: string;
    attributes: {
        name: string,
        description: string,
        volume: string,
        fileName: string,
        locale: string,
        createdAt: string,
        updatedAt: string,
        version: string,
        title: {
            en: string;
        };
    }
}

export interface MangaData {
    id: string;
    type: string;
    attributes: MangaAttributes;
    relationships: MangaRelationship[];
}

export type MangaResponse = MangaData[];

interface MangaFeedAttributes {
    volume: string;
    chapter: string;
    title: string;
    translatedLanguage: string;
    externalUrl: string;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
    pages: number;
    version: number;
}

interface MangaFeedRelationships {
    id: string;
    type: string;
    attributes: ScanlationGroupAttributes
}

export interface MangaFeedData {
    id: string;
    type: string;
    attributes: MangaFeedAttributes;
    relationships: MangaFeedRelationships[];
}

export interface ScanlationGroupAttributes {
    name: string,
    altNames: string[],
    locked: boolean,
    website: string,
    focusedLanguages: string[],
    official: boolean,
    createdAt: string,
    updatedAt: string,
    version: number
}
