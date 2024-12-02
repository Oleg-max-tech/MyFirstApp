import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// описує обєкт елем
type FavoriteItem = {
  id: number;
  title: string;
  posterPath: string;
  media_type: string;
};

// структура контексту
type FavoriteContextType = {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
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
      console.log("Loaded favorites:", storedFavorites);
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavorites(parsedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteItem[]) => {
    try {
      console.log("Saving favorites:", newFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      saveFavorites(favorites);
    }
  }, [favorites]);

  const addFavorite = async (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) return prev;
      const updatedFavorites = [...prev, item];
      saveFavorites(updatedFavorites); // Зберігаємо в AsyncStorage
      return updatedFavorites;
    });
  };

  const removeFavorite = async (id: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((item) => item.id !== id);
      saveFavorites(updatedFavorites); // Зберігаємо в AsyncStorage
      return updatedFavorites;
    });
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
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
