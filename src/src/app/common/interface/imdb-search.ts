export interface ImdbSearch {
  count: number;
  items: ImdbSearchItems[];
}

export interface ImdbSearchItems {
  id: number;
  imdbId: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear: string;
  endYear?: string;
  runtimeMinutes: number;
  genres: string;
  primaryTitleLength: number;
  originalTitleLength: number;
}
