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
import { TabParamList } from "../navigation/types";

import { useFavorite } from "../context/FavoriteContent";
import { getImageUrl } from "../services/tmbdAPI";

// Тип для навігації
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
  const handleRemoveFavorite = (id: number, media_type: string) => {
    removeFavorite(id, media_type);
  };

  // Додавання до улюблених
  const handleAddFavorite = (item: any) => {
    addFavorite(item);
  };

  // Перехід до деталей продукту
  const handleMoviePress = (id: number, media_type: string) => {
    if (id && media_type) {
      navigation.navigate("ProductDetails", {
        id: id,
        media_type: media_type,
      });
    } else {
      console.error(
        "Invalid parameters passed to ProductDetails:",
        id,
        media_type
      );
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
          renderItem={({ item }) => {
            const mediaType = item.media_type || "movie"; //
            const imageUrl = item.poster_path
              ? getImageUrl(item.poster_path, "w500")
              : null;

            return (
              <TouchableOpacity
                style={styles.favoriteItem}
                onPress={() => handleMoviePress(item.id, mediaType)}
              >
                {imageUrl ? (
                  <Image source={{ uri: imageUrl }} style={styles.poster} />
                ) : (
                  <Text>No image available</Text>
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title || item.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFavorite(item.id, item.media_type)}
                >
                  <Image
                    source={require("../assets/delete-icon.png")}
                    style={styles.removeButton}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
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
