import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem("token");

  const [token, setToken] = useState(savedToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!!savedToken);

  const loginUser = (newToken) => {
    localStorage.setItem("token", newToken);

    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rememberMe");

    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
