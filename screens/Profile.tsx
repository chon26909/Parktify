import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from "react-native";
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
import RequireLogin from "../components/RequireLogin";
import { ProfileStackParamsList } from "../stacks/ProfileStack";

type Composit = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  BottomTabNavigationProp<BottomTabParamList>
>;

export interface IProfile {
  username: string;
  firstname: string;
  lastname: string;
  email?: string;
  image: string;
}

const Profile = () => {
  // const navigation = useNavigation<Composit>();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamsList>>();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getProfile().finally(() => {
      setRefreshing(false);
    });
  };

  const [username, setUsername] = useState<IProfile["username"]>("");
  const [firstname, setFirstname] = useState<IProfile["firstname"]>("");
  const [lastname, setLastname] = useState<IProfile["lastname"]>("");
  const [email, setEmail] = useState<IProfile["email"]>("");

  const getUserProfile = async () => {
    const { data } = await getProfile();
    console.log("user profile ", data);
    setUsername(data.username);
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setEmail(data.email);
  };

  const onSubmitEditProfile = () => {
    console.log("call api update profile");
  };

  const gotoEdit = () => {
    navigation.navigate("Edit", {
      username,
      setUsername,
      firstname,
      setFirstname,
      lastname,
      setLastname,
      onSubmit: onSubmitEditProfile,
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <RequireLogin>
      {/* ----- pull down to refresh -----*/}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <>
          <Text>Username : {username}</Text>
          <Text>
            {firstname} {lastname}
          </Text>
          <Text>Email : {email}</Text>

          <TouchableHighlight onPress={gotoEdit}>
            <Text>edit profile</Text>
          </TouchableHighlight>
        </>
      </ScrollView>
    </RequireLogin>
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
