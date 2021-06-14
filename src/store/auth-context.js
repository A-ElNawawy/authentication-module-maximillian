import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [Token, setToken] = useState(null);

  const handleLogIn = (token) => {
    setToken(token);
  };

  const handleLogOut = () => {
    setToken(null);
  };

  const contextValue = {
    token: Token,
    isLoggedIn: !!Token,
    logIn: handleLogIn,
    logOut: handleLogOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
