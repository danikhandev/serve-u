"use client";

import { UserProvider } from "./UserContext";
import { AdminProvider } from "./AdminContext";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Centralized Providers Component
 * Wraps all authentication context providers (User, Doctor, Admin)
 * Use this in all layout files to provide authentication context
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <AdminProvider>
        <UserProvider>{children}</UserProvider>
      
    </AdminProvider>
  );
}
