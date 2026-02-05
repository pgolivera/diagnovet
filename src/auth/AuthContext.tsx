import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "diagnovet-auth";

// Mock user data for simulation
const MOCK_USER: User = {
  id: "user-1",
  name: "Dr. García",
  email: "dr.garcia@veterinaria.com",
  avatar: "https://ui-avatars.com/api/?name=Dr+Garcia&background=2e7d32&color=fff",
};

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful Google login
    setUser(MOCK_USER);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
    setIsLoading(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loginWithCredentials = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful login - create user from email
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const capitalizedName = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: capitalizedName,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(capitalizedName)}&background=2e7d32&color=fff`,
    };

    setUser(mockUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setIsLoading(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const register = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2e7d32&color=fff`,
    };

    setUser(mockUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const isAuthenticated = user !== null;

  const contextValue = useMemo(
    () => ({ user, isAuthenticated, isLoading, loginWithGoogle, loginWithCredentials, register, logout }),
    [user, isAuthenticated, isLoading, loginWithGoogle, loginWithCredentials, register, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
