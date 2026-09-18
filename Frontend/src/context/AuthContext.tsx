import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppUser, LoginInput, RegisterInput } from "@/types";
import { parseJson, STORAGE_KEYS } from "@/utils/storage";
import { api } from "@/services/api";

type AuthContextValue = {
  user: AppUser | null;
  isReady: boolean;
  login: (payload: LoginInput) => Promise<{ ok: boolean; error?: string }>;
  register: (payload: RegisterInput) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.token);
      const currentUser = parseJson<AppUser | null>(localStorage.getItem(STORAGE_KEYS.currentUser), null);
      if (!token && !currentUser) {
        setIsReady(true);
        return;
      }

      if (token) {
        try {
          const profile = await api.me(token);
          const normalized: AppUser = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            state: profile.state,
            pinCode: profile.pin_code,
          };
          localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(normalized));
          setUser(normalized);
        } catch {
          localStorage.removeItem(STORAGE_KEYS.token);
          localStorage.removeItem(STORAGE_KEYS.currentUser);
        }
      }
      setIsReady(true);
    };

    void bootstrap();
  }, []);

  const register: AuthContextValue["register"] = async (payload) => {
    const { name, email, password, confirmPassword, state, pinCode } = payload;
    if (name.trim().length < 2) return { ok: false, error: "Name should be at least 2 characters." };
    if (!emailRegex.test(email)) return { ok: false, error: "Enter a valid email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    if (confirmPassword !== password) return { ok: false, error: "Password and confirm password do not match." };
    if (!/^\d{6}$/.test(pinCode)) return { ok: false, error: "Pin code must be 6 digits." };
    if (state.trim().length < 2) return { ok: false, error: "Please select a valid state." };

    try {
      const response = await api.register(payload);
      const nextUser: AppUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        state: response.user.state,
        pinCode: response.user.pin_code,
      };
      localStorage.setItem(STORAGE_KEYS.token, response.access_token);
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(nextUser));
      setUser(nextUser);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : "Unable to register." };
    }
  };

  const login: AuthContextValue["login"] = async ({ email, password }) => {
    if (!emailRegex.test(email)) return { ok: false, error: "Enter a valid email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    try {
      const response = await api.login({ email, password });
      const currentUser: AppUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        state: response.user.state,
        pinCode: response.user.pin_code,
      };
      localStorage.setItem(STORAGE_KEYS.token, response.access_token);
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
      setUser(currentUser);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : "Unable to login." };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isReady, login, register, logout }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
};