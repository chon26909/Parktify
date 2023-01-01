import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import i from "./assets/favicon.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//views
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateLocationScreenStack from "./screens/CreatePin";
import HomeIcon from "./icons/HomeIcon";
import { colors } from "./components/colors";

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
};
const RootStack = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            height: 65,
            paddingBottom: 5,
          },
        }}
      >
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <HomeIcon color={color} size={40} focused={focused} />
            ),
            tabBarLabel: "หน้าแรก",
            tabBarLabelStyle: {
              fontSize: 15,
            },
          }}
        />
        <RootStack.Screen name="Create" component={CreateLocationScreenStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
