import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  user: any; 
  setAuth: (authUser: any) => void; 
  setUserData: (userData: any) => void; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); 

  const setAuth = (authUser: any) => {
    setUser(authUser);
  };

  const setUserData = (userData: any) => {
    setUser({ ...userData });
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
