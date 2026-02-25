"use client";

import { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  nombre: string;
  email: string;
  rol: "admin" | "editor";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await authClient.signIn.email({ email, password });
    return !result.error;
  };

  const logout = async () => {
    await authClient.signOut();
  };

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        nombre: session.user.name,
        email: session.user.email,
        rol: ((session.user as { role?: string }).role as "admin" | "editor") ?? "admin",
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!session?.user,
        isLoading: isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
