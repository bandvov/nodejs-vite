import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create a context for the authentication state
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check for user data in cookies on initial render
    const userName = Cookies.get("user_name");
    const userId = Cookies.get("user_id");
    const userImage = Cookies.get("user_image");
    if (userName) {
      setUserName(userName);
    }
    if (userId) {
      setUserId(userId);
    }
    if (userImage) {
      setUserId(userImage);
    }
  }, []);

  const login = ({ userName, userId, userImage }) => {
    // Logic to authenticate user
    setUserName(userName);
    setUserId(userId);
    setUserId(userImage);
  };

  const logout = () => {
    // Logic to log out user
    setUserName(null);
    setUserId(null);
    Cookies.remove("user_name");
    Cookies.remove("user_id");
    Cookies.remove("user_image");
  };

  return (
    <AuthContext.Provider value={{ userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
