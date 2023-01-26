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

type Composit = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  BottomTabNavigationProp<BottomTabParamList>
>;

interface IProfile {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
}

const Profile = () => {
  // const navigation = useNavigation<Composit>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getProfile().finally(() => {
      setRefreshing(false);
    });
  };

  const [profile, setProfile] = useState<IProfile>();

  const getUserProfile = async () => {
    const res = await getProfile();
    console.log("user profile ", res.data);
    setProfile(res.data);
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
        <Text>Username : {profile?.username}</Text>
        <Text>
          {profile?.firstname}
          {profile?.lastname}
        </Text>
        <Text>Email : {profile?.email}</Text>
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
