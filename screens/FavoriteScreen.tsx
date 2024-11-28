import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../types";

//тип для навігації
type FavoriteScreenNavigationProp = StackNavigationProp<
  TabParamList,
  "Favorites"
>;

export const FavoriteScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  // Завантаження улюблених фільмів і серіалів
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Видалення з улюблених
  const handleRemoveFavorite = async (id: number) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Перехід до деталей фільму або серіалу
  const handleMoviePress = (movieId: number, media_type: string) => {
    if (media_type === "movie") {
      navigation.navigate("MovieDetails", { movieId, media_type });
    } else if (media_type === "tv") {
      navigation.navigate("TVShowDetails", { movieId, media_type });
    } else {
      console.error("Invalid media_type:", media_type);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.backButtonText}>Back to Main Menu</Text>
      </TouchableOpacity>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.favoriteItem}
              onPress={() =>
                handleMoviePress(item.id, item.media_type || "movie")
              }
            >
              {item.poster_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title || item.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFavorite(item.id)}
              >
                <Text style={styles.removeButtonText}>⭐</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  releaseDate: {
    fontSize: 14,
    color: "#666",
  },
  mediaType: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  removeButton: {
    padding: 5,
    backgroundColor: "#FF6347",
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
  removeButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
