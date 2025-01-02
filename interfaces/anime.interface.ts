export interface AnimeData{
    id: number;
    title: {
      english: string;
      romaji:string;
      native:string;
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
    season:string;
    seasonYear:string;
    genres:string[];
    averageScore:string;
    coverImage:{
        extraLarge:string;
    }
    isAdult:boolean;
    status:string;
  }