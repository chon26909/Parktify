import { Text, View, TouchableHighlight } from "react-native";
import React, { useContext } from "react";
import { colors } from "../components/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const { setLoggedIn } = useContext(AuthContext);

  const onSignUp = () => {
    // ถ้าสำเร้จ
    AsyncStorage.setItem("token", "abce");
    setLoggedIn(true);
  };

  return (
    <View>
      <Text>SignUp</Text>
      <TouchableHighlight
        style={{
          backgroundColor: colors.primary,
          padding: 20,
        }}
        onPress={onSignUp}
      >
        <Text>SignUp</Text>
      </TouchableHighlight>

      <Text
        style={{ marginTop: 20, textAlign: "center" }}
        onPress={() => navigation.navigate("SignIn")}
      >
        I have already account, SignIn
      </Text>
    </View>
  );
};

export default SignUp;
