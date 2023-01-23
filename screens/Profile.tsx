import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../services/auth";

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [profile, setProfile] = useState<any>();

  const getUserProfile = async () => {
    console.log("refresh profile");

    const res = await getProfile();
    console.log("user profile ", res);
    setProfile(res.data);
  };

  // useEffect(getUserProfile, []);

  return (
    <View style={styles.container}>
      <Text>isLoggedIn : {String(isLoggedIn)}</Text>

      {profile ? (
        <>
          <Text>user profile : {String(profile.email)}</Text>
          <TouchableHighlight onPress={() => getUserProfile()}>
            <Text>Refresh profile</Text>
          </TouchableHighlight>
        </>
      ) : null}
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
