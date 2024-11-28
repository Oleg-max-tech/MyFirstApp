import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import SortingOptions, { SortOptions } from "../Sort/SortingOptions";

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOptions>("popularity");

  const genres = [
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "18", name: "Drama" },
    { id: "27", name: "Horror" },
    { id: "878", name: "Sci-Fi" },
  ];

  // 
  const handleStart = () => {
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: {
        type: selectedType,
        genre: selectedGenre,
        sort: selectedSort,
      },
    });
  };

  const handleSortChange = (sortOption: SortOptions) => {
    setSelectedSort(sortOption);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Movie App</Text>

      <Text style={styles.label}>Select Type:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === "movie" && styles.selectedButton,
          ]}
          onPress={() => setSelectedType("movie")}
        >
          <Text style={styles.buttonText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === "tv" && styles.selectedButton,
          ]}
          onPress={() => setSelectedType("tv")}
        >
          <Text style={styles.buttonText}>TV Shows</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Select Genre:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedGenre}
          onValueChange={(itemValue: string | null) =>
            setSelectedGenre(itemValue)
          }
        >
          <Picker.Item label="All Genres" value={null} />
          {genres.map((genre) => (
            <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
          ))}
        </Picker>
      </View>

      <SortingOptions onSortChange={handleSortChange} />

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  buttonText: {
    color: "#fff",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WelcomeScreen;
