import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  _id: string;
  name: string;
  address?: string; 
  travelHistory?: string[];
  preferences?: string[];
  nickname?: string; 
  carYear?: number;
  carCompany?: string;
  carModel?: string;
  color?: string;
  carImage?: string;
  email?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isDriver: boolean;
  isPassenger: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isDriver = user !== null && "carYear" in user;
  const isPassenger = user !== null && !("carYear" in user);

  return (
    <AuthContext.Provider value={{ user, login, logout, isDriver, isPassenger }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
