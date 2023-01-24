import { View, Text, TouchableHighlight } from "react-native";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface IProps {
  children: JSX.Element;
}

const RequireLogin = (props: IProps) => {
  const { isLoggedIn } = useContext(AuthContext);

  // user is not loggedIn
  if (!isLoggedIn) {
    return (
      <View>
        <TouchableHighlight>
          <Text>go to Login</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>go to SignUp</Text>
        </TouchableHighlight>
      </View>
    );
  }

  console.log(props.children);

  return props.children;
};

export default RequireLogin;
