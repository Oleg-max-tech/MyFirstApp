import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { FavoriteScreen } from "./screens/FavoriteScreen";
import HomeScreenn from "./screens/HomeScrenn";
import { MovieDetails } from "./components/MovieDetails";
import { TabParamList } from "./types";
import { FavoriteProvider } from "./context/FavoriteContent";
import { TVShowDetails } from "./components/TVShowDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreenn} />
    <Tab.Screen name="Favorites" component={FavoriteScreen} />
  </Tab.Navigator>
);

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
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
          <Stack.Screen name="TVShowDetails" component={TVShowDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}

{
}
