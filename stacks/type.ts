import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackList = {
  AuthStack: undefined;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type HomeStackParamList = {
  //to be continue...
};

export type CreatePinStackParamsList = {
  SelectLocation: undefined;
  DetailLocation: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  CreatePin: NavigatorScreenParams<CreatePinStackParamsList>;
  Profile: undefined;
};
