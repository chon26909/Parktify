import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//axiosConfig
import "./config/axiosConfig";

import AuthStack from "./stacks/AuthStack";
import BottomTabStack from "./stacks/BottomTabStack";
import { BottomTabParamList } from "./stacks/type";

export type RootStackList = {
  AuthStack: undefined;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
};

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackList>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // <AuthContext.Provider
    //   value={{ isLoggedIn: isLoggedIn, setLoggedIn: setIsLoggedIn }}
    // >
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="MainStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? null : (
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
    // </AuthContext.Provider>
  );
};

export default App;
