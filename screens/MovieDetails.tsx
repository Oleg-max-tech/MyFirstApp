// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   Button,
//   Alert,
// } from "react-native";
// import { tmbdApi } from "../services/tmbdAPI";
// import { getImageUrl } from "../services/tmbdAPI";
// import { ScrollView } from "react-native-gesture-handler";
// import { useFavorite } from "../context/FavoriteContent"; // Імпортуємо контекст

// type MovieDetailsProps = {
//   route: any;
// };

// export const MovieDetails: React.FC<MovieDetailsProps> = ({ route }) => {
//   const { movieId, media_type } = route.params;
//   const [movie, setMovie] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const { favorites, toggleFavorite } = useFavorite(); // Використовуємо контекст

//   const [isLiked, setIsLiked] = useState<boolean>(false);

//   const fetchDetails = async () => {
//     try {
//       const data = await tmbdApi.getMovieDetails(movieId, media_type);

//       setMovie(data);

//       // Перевіряємо, чи фільм вже є у списку улюблених через контекст
//       setIsLiked(favorites.some((item: any) => item.id === data.id));

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching details:", error);
//       setError("Error fetching details. Please try again later.");
//       setIsLoading(false);
//     }
//   };

//   const handleLike = () => {
//     try {
//       toggleFavorite(movie); // Викликаємо toggleFavorite з контексту
//       setIsLiked(!isLiked); // Оновлюємо статус лайка
//       Alert.alert(
//         isLiked ? "Removed from Favorites" : "Added to Favorites",
//         ""
//       );
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }
//   };

//   useEffect(() => {
//     if (movieId && media_type) {
//       fetchDetails();
//     }
//   }, [movieId, media_type]);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   const renderRating = (rating: number) => {
//     const roundedRating = Math.floor(rating); // Округляємо рейтинг до найближчого цілого вниз
//     return `${roundedRating}/10`; // Форматуємо як "9/10"
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {movie?.poster_path && (
//         <Image
//           source={{
//             uri: getImageUrl(movie.poster_path),
//           }}
//           style={styles.poster}
//         />
//       )}

//       <Text style={styles.title}>
//         {movie?.title || movie?.name || "No title available"}
//       </Text>

//       <Text style={styles.overview}>
//         {movie?.overview || "No description available."}
//       </Text>

//       <Text style={styles.subTitle}>
//         Rating: {movie?.vote_average ? renderRating(movie.vote_average) : "N/A"}
//       </Text>

//       <Text style={styles.subTitle}>
//         Release Date: {movie?.release_date || movie?.first_air_date || "N/A"}
//       </Text>

//       <Button
//         title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
//         onPress={handleLike}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//     textAlign: "center",
//   },
//   poster: {
//     width: 200,
//     height: 300,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   overview: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 10,
//   },
//   subTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
// });
