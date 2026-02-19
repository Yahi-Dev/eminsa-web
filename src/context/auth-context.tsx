"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

// Usuario de demostración (en producción esto vendría de una API/base de datos)
const DEMO_USERS = [
  {
    id: "1",
    nombre: "Administrador EMINSA",
    email: "admin@eminsa.com",
    password: "eminsa2024",
    rol: "admin" as const,
  },
  {
    id: "2",
    nombre: "Editor",
    email: "editor@eminsa.com",
    password: "editor2024",
    rol: "editor" as const,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem("eminsa_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("eminsa_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        nombre: foundUser.nombre,
        email: foundUser.email,
        rol: foundUser.rol,
      };
      const token = `eminsa_mock_${foundUser.id}_${Date.now()}`;
      setUser(userData);
      localStorage.setItem("eminsa_user", JSON.stringify(userData));
      localStorage.setItem("eminsa_token", token);
      // Guardar en cookie para que el middleware lo pueda leer
      document.cookie = `eminsa_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eminsa_user");
    localStorage.removeItem("eminsa_token");
    document.cookie = "eminsa_token=; path=/; max-age=0";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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
