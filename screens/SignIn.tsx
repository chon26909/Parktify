import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { colors } from "../components/colors";
import { useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../App";

const SignIn = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onSignIn = async () => {
    AsyncStorage.setItem("token", "abce");
    setLoggedIn(true);
    // const token = await AsyncStorage.getItem("token");
    // console.log("token ", token);
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

      <Text
        style={{ marginTop: 20, textAlign: "center" }}
        onPress={() => navigation.navigate("SignUp")}
      >
        SignUp
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
