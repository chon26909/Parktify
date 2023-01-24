import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ISignIn {
  email: string;
  password: string;
}

export const getToken = () => {
  const token = async () => await AsyncStorage.getItem("token");
  return token.length > 0 ? String(token) : "";
};

export const signIn = async (body: ISignIn) => {
  const res = await axios.post("/auth/signin", body);
  return res;
};

export const getProfile = async () => {
  return await axios.get("/auth/me");
};
