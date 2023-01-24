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
import { AuthStackParamList, BottomTabParamList } from "./stacks/type";
import AuthContext from "./context/AuthContext";

export type RootStackList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
};

const App = () => {
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
          {/* {isLoggedIn ? ( */}
          <RootStack.Screen name="MainStack" component={BottomTabStack} />
          {/* ) : ( */}
          <RootStack.Screen name="AuthStack" component={AuthStack} />
          {/* )} */}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
