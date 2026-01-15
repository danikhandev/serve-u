"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { MOCK_CONVERSATIONS, MOCK_USERS, MOCK_WORKERS } from "@/constants/mockData";
import { User } from "@/contexts/UserContext";

interface ChatSidebarProps {
  currentUserId: string;
  currentUserRole: "consumer" | "worker";
  onClose?: () => void;
}

export default function ChatSidebar({
  currentUserId,
  currentUserRole,
  onClose,
}: ChatSidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  
  const allUsers = [...MOCK_USERS, ...MOCK_WORKERS.map(w => ({...w, id: w.userId, firstName: w.name.split(' ')[0], lastName: w.name.split(' ')[1]}))];

  const conversations = MOCK_CONVERSATIONS.map(convo => {
    const otherUserId = currentUserRole === 'consumer' ? convo.workerId : convo.consumerId;
    const otherUser = allUsers.find(u => u.id === otherUserId);
    return {
      ...convo,
      otherUser
    };
  });

  const filteredConversations = conversations.filter((conv) => {
    const fullName = `${conv.otherUser?.firstName || ""} ${conv.otherUser?.lastName || ""}`.toLowerCase();
    const email = conv.otherUser?.email?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const getOtherUser = (conv: any) => conv.otherUser;

  const getUnreadCount = (conv: any): number => {
    return currentUserRole === "consumer"
      ? conv.consumerUnreadCount
      : conv.workerUnreadCount;
  };

  const formatTimestamp = (timestamp: string | null): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`h-full bg-white border-r border-primary/10 flex flex-col transition-all duration-300 ${
        isOpen ? "w-80 xl:w-96" : "w-20"
      }`}
    >
      <div className="bg-white border-b border-primary/10 p-4">
        <div className="flex items-center justify-between mb-3">
          {isOpen && <h2 className="text-lg font-semibold text-text">Messages</h2>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto p-1 hover:bg-primary/10 rounded-lg transition-colors"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5 text-primary" /> : <ChevronRight className="w-5 h-5 text-primary" />}
          </button>
        </div>
        {isOpen && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-primary/10 rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {!isOpen ? (
          <div className="p-2 space-y-2">
            {filteredConversations.map(conv => {
              const otherUser = getOtherUser(conv);
              if (!otherUser) return null;
              const isActive = pathname === `/chat/${otherUser.id}`;
              const unreadCount = getUnreadCount(conv);
              return (
                <Link key={conv.id} href={`/chat/${otherUser.id}`} className={`block relative group ${isActive ? "ring-2 ring-primary rounded-full" : ""}`}>
                  <div className="relative">
                    <img src={otherUser.avatar} alt={otherUser.firstName} className="w-12 h-12 rounded-full" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="divide-y divide-primary/5">
            {filteredConversations.map(conv => {
              const otherUser = getOtherUser(conv);
              if (!otherUser) return null;
              const isActive = pathname === `/chat/${otherUser.id}`;
              const unreadCount = getUnreadCount(conv);
              return (
                <Link key={conv.id} href={`/chat/${otherUser.id}`} className={`block p-3 hover:bg-primary/5 transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={otherUser.avatar} alt={otherUser.firstName} className="w-12 h-12 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className={`text-sm font-semibold truncate ${unreadCount > 0 ? 'text-text' : 'text-text/80'}`}>{otherUser.firstName} {otherUser.lastName}</h3>
                        <span className="text-xs text-text/50 ml-2 flex-shrink-0">{formatTimestamp(conv.lastMessageAt)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-xs truncate ${unreadCount > 0 ? 'text-text font-medium' : 'text-text/60'}`}>{conv.lastMessageText}</p>
                        {unreadCount > 0 && <div className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</div>}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">No conversations.</div>
        )}
      </div>
    </div>
  );
}