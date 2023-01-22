import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../components/colors";

const Search = () => {
  return (
    <View>
      <TextInput
        placeholder="ค้นหาสถานที่"
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: colors.gray,
          backgroundColor: colors.graylight,
          fontSize: 16,
        }}
        cursorColor={colors.graydark}
      />
    </View>
  );
};

export default Search;
