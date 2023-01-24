import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequireLogin from "../components/RequireLogin";
import AuthContext from "../context/AuthContext";
import DetailLocation from "../screens/DetailLocation";
import SelectLocation from "../screens/SelectLocation";
import { getToken } from "../services/auth";
import { CreatePinStackParamsList } from "./type";
import { useContext } from "react";

const CreatePinStack = () => {
  const CreateLocationStack =
    createNativeStackNavigator<CreatePinStackParamsList>();

  const { isLoggedIn } = useContext(AuthContext);

  console.log("create pin", getToken());
  alert("create pin context " + isLoggedIn);

  return (
    <RequireLogin>
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
    </RequireLogin>
  );
};

export default CreatePinStack;
