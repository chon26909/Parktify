import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../components/colors";
import { RootStackParamList } from "../App";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ marginTop: 30 }}>
      {/* <Text>HomeScreen</Text> */}
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          width: "100%",
          padding: 20,
        }}
        onPress={() => {
          navigation.navigate("Create");
        }}
      >
        <Text>Add Place</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
