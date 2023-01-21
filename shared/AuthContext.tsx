import React from "react";
interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const initialState: IAuthContext = {
  isLoggedIn: false,
  setLoggedIn(value) {},
};

const AuthContext = React.createContext<IAuthContext>(initialState);

export default AuthContext;
