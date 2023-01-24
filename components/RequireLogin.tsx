import { View, Text, TouchableHighlight } from "react-native";
import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackList } from "../App";

interface IProps {
  children: JSX.Element;
}

const RequireLogin = (props: IProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {}, [isLoggedIn]);

  // user is not loggedIn
  if (isLoggedIn === false) {
    return (
      <View style={{ margin: 50 }}>
        <TouchableHighlight
          onPress={() => navigation.navigate("AuthStack", { screen: "SignIn" })}
        >
          <Text>go to Login</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>go to SignUp</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return props.children;
};

export default RequireLogin;
