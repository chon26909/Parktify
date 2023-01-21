import { View, Text, TouchableHighlight } from "react-native";
import { colors } from "../components/colors";
import { useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../shared/AuthContext";

const SignIn = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  const onSignIn = async () => {
    AsyncStorage.setItem("token", "abce");

    const token = await AsyncStorage.getItem("token");

    console.log("token ", token);
    setLoggedIn(true);
  };

  return (
    <View>
      <Text>SignIn</Text>
      <TouchableHighlight
        style={{
          backgroundColor: colors.primary,
          padding: 20,
        }}
        onPress={onSignIn}
      >
        <Text>Login</Text>
      </TouchableHighlight>
    </View>
  );
};

export default SignIn;
