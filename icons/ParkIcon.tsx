import { View, Text, Image, TouchableHighlight } from "react-native";
import React from "react";
import Icon from "../assets/carpark.png";
import { colors } from "../components/colors";

const ParkIcon = () => {
  return (
    <View
      style={{
        backgroundColor: colors.graylight,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
      }}
    >
      <Image source={Icon} style={{ width: 35, height: 35 }} />
    </View>
  );
};

export default ParkIcon;
