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
};
