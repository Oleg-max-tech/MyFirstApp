export const API_KEY = "ea8cf142ec6b70fa2487438ddee56fca";
export const BASE_URL = "https://api.themoviedb.org/3";

export const getImageUrl = (path: string, size: string = "w500") => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const tmbdApi = {
  getMoviesByTypeAndGenre: async (type: string, genre: string | null) => {
    const url = genre
      ? `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&api_key${API_KEY}`
      : `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}`;
    const response = await fetch(url);
    return response.json();
  },
  getMovieDetails: async (movieId: number, media_type: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return response.json();
  },
};
