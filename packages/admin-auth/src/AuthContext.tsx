import { createContext, ReactNode, useContext, useState } from "react";

type AdminUser = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);

  const TOKEN_KEY = "admin_token";

  const fetchUser = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setUser(JSON.parse(token));
    } catch (err) {
      console.error(err);
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      localStorage.setItem(TOKEN_KEY, JSON.stringify({ email, password }));
      setUser({ email, password });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const refresh = async () => {
    setLoading(true);
    await fetchUser();
  };

  const value: AuthContextValue = {
    user,
    loading,
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within the AuthProvider");
  return ctx;
};
