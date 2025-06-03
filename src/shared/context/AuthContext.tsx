"use client";

import React, { createContext, useEffect, useState } from "react";
import { User } from "../type/TAuth";
import { authService } from "@/api/services/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      const storedUser = authService.getStoredUser();
      const isAuth = authService.isAuthenticated();

      if (storedUser && isAuth) {
        if (!storedUser.role) {
          storedUser.role = "admin";
        }
        setUser(storedUser);

        try {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            // Masih hardcoded admin karena belum ada role di api
            if (!currentUser.role) {
              currentUser.role = "admin";
            }
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);

    try {
      const response = await authService.login({ email, password });

      if (!response.status.isSuccess || !response.data) {
        const errorMsg = response.message || "Login failed";
        throw new Error(errorMsg);
      }

      const userData = response.data.user;
      if (userData && !userData.role) {
        userData.role = "admin";
      }

      setUser(userData || null);
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const isAuthenticated = !!user && authService.isAuthenticated();

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole: (role: string) => {
      const hasRole = Boolean(user?.role === role);
      return hasRole;
    },
    hasPermission: (permission: string) => {
      const hasPermission = Boolean(user?.permissions?.includes(permission));
      return hasPermission;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
