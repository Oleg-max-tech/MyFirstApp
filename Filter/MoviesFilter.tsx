import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { API_KEY } from "../services/tmbdAPI";

type MoviesFilterProps = {
  selectedGenre: string | null;
};

const MoviesFilter: React.FC<MoviesFilterProps> = ({ selectedGenre }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = selectedGenre
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    width: "100%",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MoviesFilter;
