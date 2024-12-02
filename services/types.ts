export type TabParamList = {
  Home: {
    type: string;
    genre: string;
    sort: string;
  };
  Favorites: undefined;
  MovieDetails: { movieId: number; media_type: string };
  TVShowDetails: { movieId: number; media_type: string };
  Welcome: undefined;
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  FavoriteScreen: undefined;
  MainTabs: undefined;
};
