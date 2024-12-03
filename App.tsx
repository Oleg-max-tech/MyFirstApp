import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import { FavoriteScreen } from "./screens/FavoriteScreen";
import HomeScreenn from "./screens/HomeScrenn";
// import { MovieDetails } from "./screens/MovieDetails";
import { TabParamList } from "./services/types";

import { FavoriteProvider, useFavorite } from "./context/FavoriteContent";
// import { TVShowDetails } from "./screens/TVShowDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProductDetails } from "./screens/ProductDeteils";
import { StackParamList } from "./services/types";

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { favorites } = useFavorite();
  const favoritesCount = favorites.length;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreenn}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined, // буде показувати тільки якщо є улюблені
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}
