import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../services/auth";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AuthStackParamList, BottomTabParamList } from "../stacks/type";
import { RootStackList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Composit = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  BottomTabNavigationProp<BottomTabParamList>
>;

const Profile = () => {
  // const navigation = useNavigation<Composit>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();

  const { isLoggedIn } = useContext(AuthContext);

  const [profile, setProfile] = useState<any>();

  const getUserProfile = async () => {
    // console.log("refresh profile");

    // const res = await getProfile();
    // console.log("user profile ", res);
    // setProfile(res.data);

    navigation.navigate("AuthStack", { screen: "SignIn" });
  };

  // useEffect(getUserProfile, []);

  return (
    <View style={styles.container}>
      <Text>isLoggedIn : {String(isLoggedIn)}</Text>

      {profile ? (
        <>
          <Text>user profile : {String(profile.email)}</Text>
        </>
      ) : null}

      <TouchableHighlight onPress={() => getUserProfile()}>
        <Text>Refresh profile</Text>
      </TouchableHighlight>
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
