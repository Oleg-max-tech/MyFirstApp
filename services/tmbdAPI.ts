export const API_KEY = "ea8cf142ec6b70fa2487438ddee56fca";
export const BASE_URL = "https://api.themoviedb.org/3";

export const getImageUrl = (path: string, size: string = "w500") => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const tmbdApi = {
  getMoviesByTypeAndGenre: async (type: string, genre: string | null) => {
    const url = genre
      ? `${BASE_URL}/discover/${type}?with_genres=${genre}&api_key${API_KEY}`
      : `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`;
    const response = await fetch(url);
    return response.json();
  },

  getProductDetails: async (id: number, media_type: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error in getProductDetails API call:", err);
      throw err;
    }
  },
};
