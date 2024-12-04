import { SortOptions } from "../types";

export type TabParamList = {
  Home: {
    type: string;
    genre: string;
    sort: SortOptions;
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
  ProductDetails: { id: number; media_type: string };
};
