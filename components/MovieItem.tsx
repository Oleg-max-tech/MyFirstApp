import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type MovieItemProps = {
  movie: {
    id: number;
    title: string;
    name?: string; // Для TV шоу
    poster_path: string;
    vote_average: number; // Рейтинг
    media_type: "movie" | "tv"; // Тип медіа
  };
  onPress: (id: number, media_type: "movie" | "tv") => void;
};

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  const title = movie.title || movie.name; // Для TV шоу використовуємо name
  const posterUri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const rating = movie.vote_average;

  // Функція для відображення рейтингу у вигляді зірок
  const renderStars = (rating: number) => {
    const filledStars = Math.round(rating / 2); // Кількість заповнених зірок
    const emptyStars = 5 - filledStars; // Кількість порожніх зірок
    const filled = Array(filledStars).fill("★");
    const empty = Array(emptyStars).fill("☆");
    return [...filled, ...empty].join("");
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(movie.id, movie.media_type)}
      style={styles.itemContainer}
    >
      <Image source={{ uri: posterUri }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{renderStars(rating)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#f39c12",
  },
});

export default MovieItem;
