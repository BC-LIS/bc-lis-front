import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/UserTypes";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("session");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      const userData = JSON.parse(userInfo);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("session", token);
    localStorage.setItem("userInfo", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
