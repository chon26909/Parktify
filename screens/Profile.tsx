import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [token, setToken] = useState<string | null>();

  const getToken = () => {
    async () => {
      const t = await AsyncStorage.getItem("token");
      console.log("profile token ", token);
      setToken(t);
    };
  };

  useEffect(getToken, []);

  return (
    <View style={styles.container}>
      <Text>isLoggedIn : {String(isLoggedIn)}</Text>
      <Text>token : {token}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
});
