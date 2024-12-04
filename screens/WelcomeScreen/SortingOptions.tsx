import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type SortOptions =
  | "release_date"
  | "rating"
  | "alphabetical"
  | "popularity";

const sortOptions: SortOptions[] = [
  "release_date",
  "rating",
  "alphabetical",
  "popularity",
];

const sortLabels: Record<SortOptions, string> = {
  release_date: "Release Date",
  rating: "Rating",
  alphabetical: "Alphabetical",
  popularity: "Popularity",
};

type SortingOptionsProps = {
  onSortChange: (sortOption: SortOptions) => void;
};

// Функція сортування
export const sortItems = (
  data: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    popularity?: number;
    title?: string;
    name?: string;
    poster_path: string;
  }[],
  sortOption: SortOptions,
  type: string
) => {
  let sortedItems = [...data];

  switch (sortOption) {
    case "release_date":
      sortedItems = sortedItems.sort((a, b) => {
        const dateA = type === "movie" ? a.release_date : a.first_air_date;
        const dateB = type === "movie" ? b.release_date : b.first_air_date;
        return dateA && dateB ? (dateA > dateB ? 1 : -1) : 0;
      });
      break;
    case "rating":
      sortedItems = sortedItems.sort(
        (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
      );
      break;
    case "popularity":
      sortedItems = sortedItems.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );
      break;
    case "alphabetical":
      sortedItems = sortedItems.sort((a, b) =>
        (a.title || a.name || "").localeCompare(b.title || b.name || "")
      );
      break;
    default:
      break;
  }

  return sortedItems;
};

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState<SortOptions>("popularity");

  // Зміна сортування
  const handleSortChange = (option: SortOptions) => {
    setSelectedSort(option);
    onSortChange(option);
  };

  return (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort By:</Text>
      <View style={styles.sortButtons}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.sortButton,
              selectedSort === option && styles.selectedSortButton,
            ]}
            onPress={() => handleSortChange(option)}
          >
            <Text
              style={[
                styles.sortButtonText,
                selectedSort === option && styles.selectedSortButtonText,
              ]}
            >
              {sortLabels[option]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

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
