import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFavorite } from "../context/FavoriteContent";
import { tmbdApi } from "../services/tmbdAPI";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../services/types";

type ProductDetailsProps = {
  route: RouteProp<StackParamList, "ProductDetails">; // Типізуємо параметри для ProductDetails
  navigation: StackNavigationProp<StackParamList, "ProductDetails">; // Типізуємо навігацію
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
  const { id, media_type } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavorite();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const loadProductDetails = async () => {
    console.log("Loading product details...");

    const productData = favorites.find(
      (item: any) => item.id === id && item.media_type === media_type
    );

    if (productData) {
      console.log("Found product in favorites:", productData);
      setProduct(productData);
      setIsLiked(true);
    } else {
      try {
        console.log(`Fetching ${media_type} details...`);

        const response = await tmbdApi.getProductDetails(id, media_type);

        console.log(`${media_type} data from API:`, response);
        setProduct(response);
      } catch (err) {
        console.error("Error fetching product details:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Failed to load product details: ${errorMessage}`);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (id && media_type) {
      loadProductDetails();
    } else {
      console.error("ProductId or media_type is undefined");
    }
  }, [id, media_type]);

  const renderRating = (rating: number) => {
    const roundedRating = Math.floor(rating);
    return `${roundedRating}/10`;
  };

  const handleLike = () => {
    try {
      if (!product?.media_type) {
        if (!media_type) {
          console.error(
            "media_type is missing and not available in route params"
          );
          return;
        }

        product.media_type = media_type;
      }

      toggleFavorite(product);
      setIsLiked(!isLiked);
      Alert.alert(isLiked ? "Removed from Favorites" : "Added to Favorites");
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {product?.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${product.poster_path}`,
          }}
          style={styles.poster}
        />
      )}
      <Text style={styles.title}>
        {product?.title || product?.name || "No title available"}
      </Text>
      <Text style={styles.overview}>
        {product?.overview || "No description available."}
      </Text>
      <Text style={styles.subTitle}>
        Rating:{" "}
        {product?.vote_average ? renderRating(product.vote_average) : "N/A"}
      </Text>
      <Text style={styles.subTitle}>
        Release Date:{" "}
        {product?.release_date || product?.first_air_date || "N/A"}
      </Text>
      <Button
        title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
        onPress={handleLike}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  overview: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
