import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create a context for the authentication state
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    // Check for user data in cookies on initial render
    const name = Cookies.get("user_name");
    const id = Cookies.get("user_id");
    const image = Cookies.get("user_image");
    if (name) {
      setUserName(name);
    }
    if (userId) {
      setUserId(id);
    }
    if (userImage) {
      setUserImage(image);
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
