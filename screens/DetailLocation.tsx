import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../stacks/type";
import { colors } from "../components/colors";

const DetailLocation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  return (
    <View>
      <Text>Detail</Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.primary, padding: 10 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ textAlign: "center" }}>
          Success and go to home screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailLocation;
