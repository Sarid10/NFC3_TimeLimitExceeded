import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isIM, setISiM] = useState(false);
  const [isDonor, setIsDonor] = useState(false);
  const [isPM, setisPM] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const user = localStorage.getItem("user_type");
    if (user === "admin") {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (user === "volunteer") {
      setIsVolunteer(true);
      setIsLoggedIn(true);
    } else if (user === "inventory_manager") {
      setISiM(true);
      setIsLoggedIn(true);
    } else if (user === "project_manager") {
      setisPM(true);
      setIsLoggedIn(true);
    } else if (user === "donor") {
      setIsDonor(true);
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(false);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isLoggedIn,
        login,
        logout,
        isIM,
        isVolunteer,
        isDonor,
        isPM,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
