"use client";

import { useUser } from "@/contexts/UserContext";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MOCK_CONVERSATIONS, MOCK_USERS, MOCK_WORKERS } from "@/constants/mockData";

export default function ChatPage() {
  const { user, loading, activePerspective } = useUser();
  const params = useParams();
  const otherUserId = params.userId as string;

  const [conversation, setConversation] = useState<typeof MOCK_CONVERSATIONS[number] | null>(null);
  const [otherUser, setOtherUser] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    email: string;
  } | null>(null);

  const currentUserRole = user?.isUserSignUpForWorker
    ? (activePerspective || 'consumer')
    : 'consumer';

  useEffect(() => {
    if (user && otherUserId) {
      // Find the conversation involving both the current user and the other user
      const foundConvo = MOCK_CONVERSATIONS.find(c =>
        (c.consumerId === user.id && c.workerId === otherUserId) ||
        (c.workerId === user.id && c.consumerId === otherUserId)
      );
      setConversation(foundConvo || null);

      // Find the other user's details - check users first, then workers
      const foundUser = MOCK_USERS.find(u => u.id === otherUserId);
      if (foundUser) {
        setOtherUser({
          id: foundUser.id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          profileImage: foundUser.avatar,
          email: foundUser.email,
        });
      } else {
        const foundWorker = MOCK_WORKERS.find(w => w.userId === otherUserId);
        if (foundWorker) {
          const nameParts = foundWorker.name.split(' ');
          setOtherUser({
            id: foundWorker.userId,
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            profileImage: foundWorker.avatar,
            email: '',
          });
        }
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
  
  const otherUserName = `${otherUser.firstName} ${otherUser.lastName}`;

  return (
    <div className="h-screen bg-background pt-16">
      <div className="h-full flex relative">
        <div className="hidden lg:block lg:w-96 flex-shrink-0 h-full">
          <ChatSidebar
            currentUserRole={currentUserRole as "consumer" | "worker"}
          />
        </div>
        <div className="flex-1 h-full">
          <ChatWindow
            conversationId={conversation.id}
            userName={otherUserName}
            userImage={otherUser.profileImage}
            isOnline={true}
            currentUserId={user.id}
            currentUserRole={currentUserRole as "consumer" | "worker"}
          />
        </div>
      </div>
    </div>
  );
}