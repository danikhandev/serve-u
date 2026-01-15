"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { MOCK_ADMIN } from "@/constants/mockData";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminContextType {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  refetch: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "serve_u_admin_data";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (cached) {
      setAdmin(JSON.parse(cached));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // For mock purposes, we just log them in as the Super Admin regardless of email if valid structure
      if (email.includes("@")) {
        const adminUser = { ...MOCK_ADMIN, email }; // Use input email for realism
        setAdmin(adminUser);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      } else {
        setError("Invalid email format");
      }
      setLoading(false);
    }, 800);
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    // Clear cookies
    document.cookie = "admin-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  const refetch = useCallback(async () => {
    // No-op for static
    console.log("Refetching admin...");
  }, []);

  return (
    <AdminContext.Provider
      value={{ admin, loading, error, login, logout, refetch }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}