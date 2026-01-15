"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// Types based on Prisma Schema (Simplified for Context)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isUserSignUpForWorker: boolean;
  isEmailVerified: boolean;
  idVerificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
}

export type UserPerspective = "consumer" | "worker" | "admin"; // Added admin for clarity

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  activePerspective: UserPerspective; // New: Tracks current active view
  login: (email: string, isWorker?: boolean) => Promise<void>; // Added isWorker to mock login
  logout: () => void;
  refetch: () => Promise<void>;
  switchPerspective: (perspective: UserPerspective) => void; // New: Function to switch view
  clearAllUsers: () => void; // Clear all user auth data
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = "serve_u_user_data";
const PERSPECTIVE_STORAGE_KEY = "serve_u_user_perspective";

// MOCK STATIC USERS
const MOCK_ALEX_CONSUMER: User = {
  id: "user-1",
  email: "alex@example.com",
  firstName: "Alex",
  lastName: "Consumer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  isUserSignUpForWorker: false,
  isEmailVerified: true,
  idVerificationStatus: "VERIFIED",
};

const MOCK_SARAH_WORKER: User = {
  id: "user-2",
  email: "sarah@example.com",
  firstName: "Sarah",
  lastName: "Worker",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  isUserSignUpForWorker: true, // This user is also a worker
  isEmailVerified: true,
  idVerificationStatus: "VERIFIED",
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePerspective, setActivePerspective] = useState<UserPerspective>("consumer");

  // Load from local storage on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem(USER_STORAGE_KEY);
    const cachedPerspective = localStorage.getItem(PERSPECTIVE_STORAGE_KEY);

    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
        if (parsedUser.isUserSignUpForWorker && cachedPerspective === "worker") {
          setActivePerspective("worker");
        } else {
          setActivePerspective("consumer");
        }
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(PERSPECTIVE_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, isWorkerLogin: boolean = false) => {
    setLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      let loggedInUser: User | null = null;
      if (email === MOCK_ALEX_CONSUMER.email) {
        loggedInUser = MOCK_ALEX_CONSUMER;
      } else if (email === MOCK_SARAH_WORKER.email) {
        loggedInUser = MOCK_SARAH_WORKER;
      }

      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
        if (loggedInUser.isUserSignUpForWorker && isWorkerLogin) {
          setActivePerspective("worker");
          localStorage.setItem(PERSPECTIVE_STORAGE_KEY, "worker");
        } else {
          setActivePerspective("consumer");
          localStorage.setItem(PERSPECTIVE_STORAGE_KEY, "consumer");
        }
      } else {
        setError("Invalid credentials or user not found. Try alex@example.com or sarah@example.com");
      }
      setLoading(false);
    }, 800);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setActivePerspective("consumer"); // Reset to default
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(PERSPECTIVE_STORAGE_KEY);
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  const refetch = useCallback(async () => {
    // For static data, simulate re-fetching and applying changes
    const updatedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (updatedUser) {
      setUser(JSON.parse(updatedUser));
    }
    console.log("Refetching user profile...");
  }, []);

  const switchPerspective = useCallback((perspective: UserPerspective) => {
    if (user && user.isUserSignUpForWorker && (perspective === "consumer" || perspective === "worker")) {
      setActivePerspective(perspective);
      localStorage.setItem(PERSPECTIVE_STORAGE_KEY, perspective);
    } else if (perspective === "consumer") {
      setActivePerspective(perspective);
      localStorage.setItem(PERSPECTIVE_STORAGE_KEY, perspective);
    }
     // Admin perspective is handled separately by AdminContext
  }, [user]);

  const clearAllUsers = useCallback(() => {
    setUser(null);
    setActivePerspective("consumer");
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(PERSPECTIVE_STORAGE_KEY);
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "auth-user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, activePerspective, login, logout, refetch, switchPerspective, clearAllUsers }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
