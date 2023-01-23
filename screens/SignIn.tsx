import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import { colors } from "../components/colors";
import { useContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../stacks/type";
import { signIn } from "../services/auth";

const SignIn = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onSignIn = async () => {
    const res: any = await signIn({ email: "c@gmail.com", password: "1234" });

    console.log("res", res);

    if (res.message === "success") {
      AsyncStorage.setItem("token", res.token);
      setLoggedIn(true);
    }
  };

  return (
    <View>
      <TextInput />
      <TextInput />
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
