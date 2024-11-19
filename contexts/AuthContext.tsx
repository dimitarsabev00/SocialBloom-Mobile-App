import React, { createContext, useState, useContext } from "react";

// Define the shape of your context
interface AuthContextType {
  user: any; // Replace 'any' with a specific type if you know the user structure
  setAuth: (authUser: any) => void; // Replace 'any' if you know the type for 'authUser'
  setUserData: (userData: any) => void; // Replace 'any' with the user data type
}

// Provide a default value for context (can be null or a placeholder)
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Replace 'any' with specific user type if known

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
