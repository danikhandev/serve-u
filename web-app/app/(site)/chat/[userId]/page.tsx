"use client";

import { useUser } from "@/contexts/UserContext";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MOCK_CONVERSATIONS, MOCK_USERS, MOCK_WORKERS } from "@/constants/mockData";

export default function ChatPage() {
  const { user, loading } = useUser();
  const params = useParams();
  const otherUserId = params.userId as string;

  const [conversation, setConversation] = useState<typeof MOCK_CONVERSATIONS[number] | null>(null);
  const [otherUser, setOtherUser] = useState<typeof MOCK_USERS[number] | typeof MOCK_WORKERS[number] | null>(null);

  const currentUserRole = user?.isUserSignUpForWorker 
    ? (user.activePerspective || 'consumer')
    : 'consumer';

  useEffect(() => {
    if (user && otherUserId) {
      // Find the conversation involving both the current user and the other user
      const foundConvo = MOCK_CONVERSATIONS.find(c => 
        (c.consumerId === user.id && c.workerId === otherUserId) ||
        (c.workerId === user.id && c.consumerId === otherUserId)
      );
      setConversation(foundConvo);

      // Find the other user's details
      const allUsers = [...MOCK_USERS, ...MOCK_WORKERS.map(w => ({...w, id: w.userId}))]; // Combine for searching
      const foundOtherUser = allUsers.find(u => u.id === otherUserId);
      if (foundOtherUser) {
        setOtherUser({
          id: foundOtherUser.id,
          firstName: foundOtherUser.firstName || foundOtherUser.name,
          lastName: foundOtherUser.lastName || '',
          profileImage: foundOtherUser.avatar,
          email: foundOtherUser.email,
        });
      }
    }
  }, [user, otherUserId]);

  if (loading || !user || !conversation || !otherUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }
  
  const otherUserRole = currentUserRole === "consumer" ? "worker" : "consumer";
  const otherUserName = `${otherUser.firstName} ${otherUser.lastName}`;

  return (
    <div className="h-screen bg-background pt-16">
      <div className="h-full flex relative">
        <div className="hidden lg:block lg:w-96 flex-shrink-0 h-full">
          <ChatSidebar
            currentUserId={user.id}
            currentUserRole={currentUserRole}
          />
        </div>
        <div className="flex-1 h-full">
          <ChatWindow
            conversationId={conversation.id}
            userId={otherUser.id}
            userName={otherUserName}
            userImage={otherUser.profileImage}
            userRole={otherUserRole}
            isOnline={true} // Mock online status
            currentUserId={user.id}
            currentUserRole={currentUserRole}
          />
        </div>
      </div>
    </div>
  );
}