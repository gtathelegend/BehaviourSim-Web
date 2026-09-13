"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { BehaviorSimAPIError } from "@/lib/api/errors";
import type { AccountResponse } from "@/lib/api/types";

interface AuthContextType {
  user: AccountResponse | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AccountResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Calls GET /v1/account with credentials: "include"
      const data = await apiClient<AccountResponse>("/v1/account");
      setUser(data);
    } catch (err) {
      if (err instanceof BehaviorSimAPIError && err.statusCode === 401) {
        // Normal signed-out state
        setUser(null);
      } else if (err instanceof Error) {
        setError(err.message);
        setUser(null);
      } else {
        setError("Failed to check authentication status.");
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiClient<{ status: string; message: string }>("/v1/auth/logout", {
        method: "POST",
      });
    } catch {
      // Invalidate UI state regardless of server response
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push("/");
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
