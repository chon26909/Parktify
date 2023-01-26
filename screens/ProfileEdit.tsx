import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ProfileStackParamsList } from "../stacks/ProfileStack";
import { colors } from "../components/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IProfileEdit {
  username: string;
  setUsername?: (value: string) => void;
  firstname: string;
  setFirstname?: (value: string) => void;
  onSubmit?: () => void;
}

const ProfileEdit = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamsList>>();

  const { params } = useRoute<RouteProp<ProfileStackParamsList, "Edit">>();
  console.log("props edit profile", params);

  const onSubmit = () => {
    navigation.goBack();
    params.onSubmit();
  };

  return (
    <View>
      <Text>ProfileEdit</Text>
      <TextInput
        style={styles.input}
        defaultValue={params.username}
        onChangeText={(text) => params.setUsername(text)}
      />
      <TextInput
        style={styles.input}
        defaultValue={params.firstname}
        onChangeText={(text) => params.setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        defaultValue={params.lastname}
        onChangeText={(text) => params.setLastname(text)}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Text>update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEdit;

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
