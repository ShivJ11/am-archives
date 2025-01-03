export interface AnimeData {
  id: number;
  title: {
    english: string;
    romaji: string;
    native: string;
  };
  description: string;
  duration: number;
  episodes: number;
  format: string;
  bannerImage: string;
  startDate: {
    year: string;
    month: string;
    day: string;
  }
  trending: number;
  season: string;
  seasonYear: string;
  genres: string[];
  averageScore: string;
  coverImage: {
    extraLarge: string;
  }
  isAdult: boolean;
  status: string;
  studios: {
    edges:StudioEdge[]
  }
  trailer:{
    id:string;
    site:string;
    thumbnail:string;
  }
  characters:{
    edges:CharacterEdge[]
  }
}
export interface CharacterEdge {
  node: Character;
  role:string;
  voiceActors:Staff[];
}
export interface Staff {
  name:{
    full:string;
  }
  image:{
    large:string;
  }
}
export interface Character {
  name:{
    full:string;
  }
  image:{
    large:string;
  };
}
interface StudioEdge {
  node: Studio;
  isMain: boolean;
};
interface Studio {
  id: number;
  name: string;
  siteUrl: string;
};