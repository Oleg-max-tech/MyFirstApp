export type TabParamList = {
  Home: {
    type: string;
    genre: string;
    sort: string;
  };
  Favorites: undefined;

  ProductDetails: { id: number; media_type: string };
  Welcome: undefined;
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  FavoriteScreen: undefined;
  MainTabs: undefined;
};

export type StackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  ProductDetails: { id: number; media_type: string }; // Ваш тип для параметрів ProductDetails
};
