import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../services/types";

import { useFavorite } from "../context/FavoriteContent";
import { getImageUrl } from "../services/tmbdAPI";

// тип для навігації
type FavoriteScreenNavigationProp = StackNavigationProp<
  TabParamList,
  "Favorites"
>;

export const FavoriteScreen: React.FC = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const [localFavorites, setLocalFavorites] = useState<any[]>([]);
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  // Видалення з улюблених
  const handleRemoveFavorite = (id: number) => {
    removeFavorite(id);
  };

  // Додавання до улюблених
  const handleAddFavorite = (item: any) => {
    addFavorite(item); // Додаємо до контексту
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

      {localFavorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet</Text>
      ) : (
        <FlatList
          data={localFavorites}
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
                    uri: getImageUrl(item.poster_path, "w500"),
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
                <Image
                  source={require("../assets/delete-icon.png")}
                  style={styles.removeButton}
                />
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
  removeButton: {
    padding: 5,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
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
