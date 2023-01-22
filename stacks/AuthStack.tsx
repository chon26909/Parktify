import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./type";

//screen
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const AuthStack = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, contentStyle: styles.container }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
});
