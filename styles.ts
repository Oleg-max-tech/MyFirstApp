import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  movieItem: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginLeft: Platform.select({
      ios: 13,
      android: 0,
    }),
    marginRight: Platform.select({
      ios: 13,
      android: 0,
    }),
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  movieDetails: {
    padding: 20,
  },
  movieDetailsImage: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  movieDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieDetailsOverview: {
    fontSize: 16,
    marginBottom: 10,
  },
});
