import axios from "axios";

interface ISignIn {
  email: string;
  password: string;
}

export const signIn = async (body: ISignIn) => {
  const res = await axios.post("/auth/signin", body);
  return res;
};

export const getProfile = async () => {
  return await axios.get("/auth/me");
};
