import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type MovieListProps = {
  item: any;
  onPress: () => void;
};

export const MovieList: React.FC<MovieListProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title || item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
