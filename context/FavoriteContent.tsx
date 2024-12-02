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
  removeFavorite: (id: number) => void;
  toggleFavorite: (item: FavoriteItem) => void; // Додаємо toggleFavorite
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
    const updateFavorites = async () => {
      if (favorites.length > 0) {
        await saveFavorites(favorites);
      }
    };
    updateFavorites();
  }, [favorites]);

  // Додавання нового улюбленого
  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.some((fav) => fav.id === item.id)
        ? prev
        : [...prev, item];

      return updatedFavorites;
    });
  };

  // Видалення улюбленого
  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((item) => item.id !== id);
      return updatedFavorites;
    });
  };

  // Функція для додавання або видалення елемента з улюблених
  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      // Перевіряємо, чи вже є елемент у списку улюблених
      const isFavorite = prev.some(
        (fav) => fav.id === item.id && fav.media_type === item.media_type
      );

      if (isFavorite) {
        // Якщо вже є, видаляємо його
        return prev.filter(
          (fav) => fav.id !== item.id || fav.media_type !== item.media_type
        );
      } else {
        // Якщо немає, додаємо в список улюблених
        return [...prev, item];
      }
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
