import React, { useEffect, useState, useReducer, useMemo } from "react";
import i from "./assets/favicon.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

//views
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateLocationScreenStack from "./screens/CreatePin";
import HomeIcon from "./icons/HomeIcon";
import { colors } from "./components/colors";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import AuthContext from "./context/AuthContext";

export type RootStackList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Create: undefined;
};

const AuthStackList = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const MainStackList = () => {
  const MainStack = createBottomTabNavigator<MainStackParamList>();

  return (
    <MainStack.Navigator
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
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <HomeIcon color={color} size={30} focused={focused} />
          ),
          tabBarLabel: "หน้าแรก",
          tabBarLabelStyle: {
            fontSize: 15,
          },
        }}
      />
      <MainStack.Screen name="Create" component={CreateLocationScreenStack} />
    </MainStack.Navigator>
  );
};

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackList>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsLogin = () => {
    async () => {
      console.log("Checking");

      const token = await AsyncStorage.getItem("token");

      console.log("token in root app", token);

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
  };

  useEffect(checkIsLogin, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, setLoggedIn: setIsLoggedIn }}
    >
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLoggedIn ? (
            <RootStack.Screen name="Main" component={MainStackList} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthStackList} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
