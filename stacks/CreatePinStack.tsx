import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailLocation from "../screens/DetailLocation";
import SelectLocation from "../screens/SelectLocation";
import { CreatePinStackParamsList } from "./type";

const CreatePinStack = () => {
  const CreateLocationStack =
    createNativeStackNavigator<CreatePinStackParamsList>();

  return (
    <CreateLocationStack.Navigator initialRouteName="SelectLocation">
      <CreateLocationStack.Screen
        name="SelectLocation"
        component={SelectLocation}
      />
      <CreateLocationStack.Screen
        name="DetailLocation"
        component={DetailLocation}
      />
    </CreateLocationStack.Navigator>
  );
};

export default CreatePinStack;
