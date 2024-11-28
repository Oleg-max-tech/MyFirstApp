import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { API_KEY } from "../services/tmbdAPI";

type TVShowsFilterProps = {
  selectedGenre: string | null;
};

const TVShowsFilter: React.FC<TVShowsFilterProps> = ({ selectedGenre }) => {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      try {
        const url = selectedGenre
          ? `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${selectedGenre}`
          : `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setTvShows(data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [selectedGenre]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={tvShows}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
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

export default TVShowsFilter;
