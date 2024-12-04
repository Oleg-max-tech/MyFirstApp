export type SortOptions =
  | "release_date"
  | "rating"
  | "alphabetical"
  | "popularity";

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  popularity?: number;
  poster_path?: string;
}
