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
import { RootStackList } from "../App";
import { AxiosError } from "axios";

const SignIn = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const [error, setError] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();
  const navigationAuth =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onSignIn = async () => {
    try {
      const res: any = await signIn({ email: "c@gmail.com", password: "1234" });

      console.log("res", res);

      if (res.message === "success") {
        AsyncStorage.setItem("token", res.token);
        setLoggedIn(true);
        navigation.replace("MainStack", { screen: "Home" });
      }
    } catch (error: any) {
      console.log("error sign in", error);
      setError(error.message);
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>

      {error.length > 0 ? <Text>{error}</Text> : null}
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
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
        onPress={() => navigationAuth.navigate("SignUp")}
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
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 5,
  },
});
