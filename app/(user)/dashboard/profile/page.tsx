"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import UserProfileTab from "@/components/profile/UserProfileTab";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSuccess = (message: string) => {
    setSuccess(message);
    setError("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleError = (message: string) => {
    setError(message);
    setSuccess("");
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">My Profile</h1>
        <p className="text-text/70">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-6"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm mb-6"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
            <button onClick={() => setSuccess("")} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Content */}
      {user && (
        <UserProfileTab
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
    </div>
  );
}
