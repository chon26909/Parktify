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
} from "./screens/SelectLocation";

//color
import { colors } from "./components/colors";

//icon
import HomeIcon from "./icons/HomeIcon";
import AuthStack from "./stacks/AuthStack";
import BottomTabStack from "./stacks/BottomTabStack";
import { BottomTabParamList } from "./stacks/type";

export type RootStackList = {
  AuthStack: undefined;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
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
            <RootStack.Screen name="MainStack" component={BottomTabStack} />
          ) : (
            <RootStack.Screen name="AuthStack" component={AuthStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
