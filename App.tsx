import React, { useState, useEffect } from "react";
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
import { getToken } from "./services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
};

// const checkTokenInStorage = () => {
//   const token = async () => await getToken();
//   return token.length > 0 ? true : false;
// };

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackList>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkTokenInStorage = async () => {
      await AsyncStorage.getItem("token").then((token) => {
        console.log("token in storage", token);
        if (token) {
          setIsLoggedIn(String(token).length > 0 ? true : false);
        } else {
          setIsLoggedIn(false);
        }
      });
    };
    checkTokenInStorage();
  }, []);

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
