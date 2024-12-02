import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../services/types";
import { tmbdApi } from "../services/tmbdAPI";
import { sortItems, SortOptions } from "./WelcomeScreen/SortingOptions";
import { getImageUrl } from "../services/tmbdAPI";

type HomeScreenProps = BottomTabScreenProps<TabParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { type, genre, sort } = route.params;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        let data;
        // Викликаємо відповідну функцію API в залежності від type і genre
        data = await tmbdApi.getMoviesByTypeAndGenre(type, genre);

        if (data.results && data.results.length > 0) {
          setItems(data.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, genre]);

  const handleMoviePress = (movieId: number, media_type: string) => {
    console.log(
      `Navigating to ${
        media_type === "movie" ? "MovieDetails" : "TVShowDetails"
      } with movieId: ${movieId} and media_type: ${media_type}`
    );

    if (media_type === "movie") {
      navigation.navigate("MovieDetails", { movieId, media_type });
    } else if (media_type === "tv") {
      navigation.navigate("TVShowDetails", { movieId, media_type });
    } else {
      console.error("Invalid media_type:", media_type);
    }
  };

  //Повернення на welcomeScreen
  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No movies found.</Text>
      </View>
    );
  }

  // Сортуємо фільмів до опцій
  const sortedItems = sortItems(items, sort as SortOptions, type);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToWelcome}>
        <Text style={styles.backButtonText}>Back to Main menu</Text>
      </TouchableOpacity>

      <FlatList
        data={sortedItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieContainer}
            onPress={() => handleMoviePress(item.id, type)}
          >
            <Image
              source={{
                uri: getImageUrl(item.poster_path, "w500"),
              }}
              style={styles.poster}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title || item.name}</Text>
              <Text style={styles.releaseDate}>
                {item.release_date || item.first_air_date || "N/A"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  movieContainer: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    color: "#333",
  },
  releaseDate: {
    fontSize: 14,
    color: "#666",
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

export default HomeScreen;
