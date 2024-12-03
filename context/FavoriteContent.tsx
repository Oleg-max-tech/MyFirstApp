import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Описуємо тип елемента улюбленого
type FavoriteItem = {
  id: number;
  title: string;
  posterPath: string;
  media_type: string;
};

// Структура контексту
type FavoriteContextType = {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number, media_type: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Завантаження улюблених з AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  // Збереження улюблених в AsyncStorage
  const saveFavorites = async (newFavorites: FavoriteItem[]) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Оновлення AsyncStorage при зміні списку улюблених
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Додавання нового улюбленого
  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) =>
      prev.some(
        (fav) => fav.id === item.id && fav.media_type === item.media_type
      )
        ? prev
        : [...prev, item]
    );
  };

  // Видалення улюбленого
  const removeFavorite = (id: number, media_type: string) => {
    setFavorites((prev) =>
      prev.filter((fav) => fav.id !== id || fav.media_type !== media_type)
    );
  };

  // Функція для додавання або видалення елемента з улюблених
  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const isFavorite = prev.some(
        (fav) => fav.id === item.id && fav.media_type === item.media_type
      );

      return isFavorite
        ? prev.filter(
            (fav) => fav.id !== item.id || fav.media_type !== item.media_type
          )
        : [...prev, item];
    });
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
