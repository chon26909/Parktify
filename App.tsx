import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//context
import AuthContext from "./context/AuthContext";

//screen
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";

//stack
import CreateLocationScreenStack, {
  CreatePinStackParamsList,
} from "./screens/CreatePin";

//color
import { colors } from "./components/colors";

//icon
import HomeIcon from "./icons/HomeIcon";

export type RootStackList = {
  AuthStack: undefined;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  CreatePin: NavigatorScreenParams<CreatePinStackParamsList>;
  Profile: undefined;
};

const AuthStackList = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, contentStyle: styles.container }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const MainStackList = () => {
  const MainStack = createBottomTabNavigator<BottomTabParamList>();

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
      <MainStack.Screen
        name="CreatePin"
        component={CreateLocationScreenStack}
      />
      <MainStack.Screen name="Profile" component={Profile} />
    </MainStack.Navigator>
  );
};

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackList>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, setLoggedIn: setIsLoggedIn }}
    >
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="MainStack"
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLoggedIn ? (
            <RootStack.Screen name="MainStack" component={MainStackList} />
          ) : (
            <RootStack.Screen name="AuthStack" component={AuthStackList} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
});
