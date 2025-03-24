"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useSession, type SessionContextValue } from "next-auth/react";

// Define the shape of the AuthContext
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

// Create the AuthContext with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const TokenProvider = ({ children }: AuthProviderProps) => {
  const { data: session }: SessionContextValue = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    if (session) {
      setAccessToken(session.access_token as string | null); // Ensure the correct property access
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
