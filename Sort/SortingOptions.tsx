import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type SortOptions =
  | "release_date"
  | "rating"
  | "alphabetical"
  | "popularity";

type SortingOptionsProps = {
  onSortChange: (sortOption: SortOptions) => void;
};

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState<SortOptions>("popularity");

  // зміна сортування
  const handleSortChange = (option: SortOptions) => {
    setSelectedSort(option);
    onSortChange(option);
  };

  return (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort By:</Text>
      <View style={styles.sortButtons}>
        {["release_date", "rating", "alphabetical", "popularity"].map(
          (option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortButton,
                selectedSort === option && styles.selectedSortButton,
              ]}
              onPress={() => handleSortChange(option as SortOptions)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  selectedSort === option && styles.selectedSortButtonText,
                ]}
              >
                {capitalize(option)}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

// Допоміжна функція для форматування тексту
const capitalize = (text: string) =>
  text
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

const styles = StyleSheet.create({
  sortContainer: {
    marginVertical: 20,
  },
  sortLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  sortButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  sortButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedSortButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  sortButtonText: {
    color: "#000",
    fontSize: 14,
  },
  selectedSortButtonText: {
    color: "#fff",
  },
});

export default SortingOptions;
