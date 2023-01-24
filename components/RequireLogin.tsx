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

  if (isLoggedIn === true) {
    return props.children;
  }
  // user is not loggedIn
  else if (isLoggedIn === false) {
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
  } else {
    return <View></View>;
  }
};

export default RequireLogin;
