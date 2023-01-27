import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequireLogin from "../components/RequireLogin";
import AuthContext from "../context/AuthContext";
import DetailLocation from "../screens/DetailLocation";
import SelectLocation from "../screens/SelectLocation";
import { getToken } from "../services/auth";
import { CreatePinStackParamsList } from "./type";
import { useContext } from "react";
import Profile, { IProfile } from "../screens/Profile";
import ProfileEdit, { IProfileEdit } from "../screens/ProfileEdit";

export type ProfileStackParamsList = {
  Profile: undefined;
  Edit: {
    username: string;
    // setUsername: (value: string) => void;
    firstname: string;
    // setFirstname: (value: string) => void;
    lastname: string;
    // setLastname: (value: string) => void;
    // onSubmit: () => void;
  };
};

const ProfileStack = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Edit" component={ProfileEdit} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStack;
