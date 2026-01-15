"use client";

import { useUser } from "@/contexts/UserContext";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatEmptyState from "@/components/chat/ChatEmptyState";
import { Loader2 } from "lucide-react";

export default function ChatPage() {
  const { user, loading, activePerspective } = useUser();

  // Determine current role based on user's active perspective
  const currentUserRole = user?.isUserSignUpForWorker
    ? (activePerspective || 'consumer')
    : 'consumer';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text mb-2">
            Please log in to access chat
          </h2>
          <p className="text-sm text-text/60">
            You need to be logged in to use the messaging feature
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background pt-16">
      <div className="h-full flex">
        {/* Sidebar - Full width on mobile, dynamic width on desktop */}
        <div className="w-full lg:w-auto flex-shrink-0 h-full">
          <ChatSidebar
            currentUserRole={currentUserRole as "consumer" | "worker"}
          />
        </div>

        {/* Main Chat Area - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex flex-1 h-full">
          <ChatEmptyState />
        </div>
      </div>
    </div>
  );
}
