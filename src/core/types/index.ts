export type MovieType = {
  id: string | number;
  name: string;
  title?: string;
  vote_count: number;
  vote_average: number;
  poster_path?: string;
  backdrop_path: string;
  original_name?: string;
  original_title?: string;
  release_date?: string;
  genre_ids?: number[];
  item?: any;
  genres?: {id: number | string; name: string}[];
  overview?: string;
  homepage?: string;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  runtime?: number;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
};
