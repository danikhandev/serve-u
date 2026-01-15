"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, CheckCheck, Menu } from "lucide-react";
import FileAttachmentPreview from "./FileAttachmentPreview";
import MediaViewerModal from "./MediaViewerModal";
import VoiceRecorder from "./VoiceRecorder";
import { MOCK_MESSAGES } from "@/constants/mockData";

// Simplified Message type for the mock data structure
interface Attachment {
  id?: string;
  url?: string;
  fileUrl?: string;
  type?: string;
  fileType?: string;
  name?: string;
  fileName?: string;
  fileSize?: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: string;
  messageType: string;
  content: string | null;
  createdAt: string;
  readAt: string | null;
  attachments?: Attachment[];
}

interface ChatWindowProps {
  conversationId: string;
  userName: string;
  userImage?: string;
  isOnline: boolean;
  currentUserId: string;
  currentUserRole: "worker" | "consumer";
  onToggleSidebar?: () => void;
}

export default function ChatWindow({
  conversationId,
  userName,
  userImage,
  isOnline,
  currentUserId,
  currentUserRole,
  onToggleSidebar,
}: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Attachment | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load mock messages for the given conversation
    const initialMessages = MOCK_MESSAGES[conversationId as keyof typeof MOCK_MESSAGES] || [];
    setMessages(initialMessages);
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      senderType: currentUserRole === "worker" ? "WORKER" : "USER",
      messageType: "TEXT",
      content: message.trim(),
      createdAt: new Date().toISOString(),
      readAt: null,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleSendFile = (file: File) => {
    const newAttachment = {
      id: `att-${Date.now()}`,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file), // Create a temporary local URL for preview
      fileType: file.type,
      fileSize: file.size,
    };
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      senderType: currentUserRole === "worker" ? "WORKER" : "USER",
      messageType: file.type.startsWith("image") ? "IMAGE" : "DOCUMENT",
      content: null,
      createdAt: new Date().toISOString(),
      readAt: null,
      attachments: [newAttachment],
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendFile(file);
    }
    e.target.value = ""; // Reset input
  };
  
  const handleVoiceRecordingComplete = (audioBlob: Blob) => {
    const file = new File([audioBlob], `voice-note-${Date.now()}.webm`, { type: audioBlob.type });
    handleSendFile(file);
    setShowVoiceRecorder(false);
  };

  // Helper Functions
  const formatTime = (date: string) => new Date(date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formatDate = (date: string) => new Date(date).toLocaleDateString([], { month: 'long', day: 'numeric' });
  const allMediaAttachments = messages.flatMap(msg => msg.attachments || []).filter(att => (att.fileType || att.type || '').startsWith('image/') || (att.fileType || att.type || '').startsWith('video/'));

  return (
    <>
      <div className="h-full flex flex-col bg-gray-50">
        <div className="bg-white border-b border-primary/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button onClick={onToggleSidebar} className="lg:hidden p-1 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-text/60" />
              </button>
            )}
            <div className="relative flex-shrink-0">
              <img src={userImage} alt={userName} className="w-10 h-10 rounded-full" />
              {isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text">{userName}</h2>
              <p className="text-xs text-text/60">{isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
        </div>

        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {messages.map((msg, index) => {
            const isOwnMessage = msg.senderId === currentUserId;
            const prevMsg = messages[index - 1];
            const showDate = !prevMsg || formatDate(prevMsg.createdAt) !== formatDate(msg.createdAt);
            const showAvatar = !isOwnMessage && (!prevMsg || prevMsg.senderId !== msg.senderId || showDate);

            return (
              <div key={msg.id}>
                {showDate && <div className="text-center text-xs text-gray-400 my-4">{formatDate(msg.createdAt)}</div>}
                <div className={`flex gap-2 mb-3 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-shrink-0 w-8">
                    {showAvatar && <img src={userImage} alt={userName} className="w-8 h-8 rounded-full" />}
                  </div>
                  <div className={`max-w-[70%] ${isOwnMessage ? "items-end" : "items-start"}`}>
                    {msg.attachments?.map(att => (
                      <FileAttachmentPreview key={att.id} attachment={att} onPreview={() => setSelectedMedia(att)} />
                    ))}
                    {msg.content && (
                      <div className={`px-3 py-2 rounded-2xl ${isOwnMessage ? "bg-primary text-white rounded-br-sm" : "bg-white text-text border border-gray-200 rounded-bl-sm"}`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 mt-1 px-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                      <span className="text-xs text-text/50">{formatTime(msg.createdAt)}</span>
                      {isOwnMessage && <CheckCheck className="w-3 h-3 text-primary" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="bg-white border-t border-primary/10 p-3">
          <div className="flex items-end gap-2">
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
            <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-primary/5 rounded-lg">
              <Paperclip className="w-5 h-5 text-primary" />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none"
            />
            {message.trim() ? (
              <button onClick={handleSendMessage} className="p-2 bg-primary text-white rounded-lg">
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={() => setShowVoiceRecorder(true)} className="p-2 hover:bg-primary/5 rounded-lg">
                <Mic className="w-5 h-5 text-primary" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showVoiceRecorder && <VoiceRecorder onRecordingComplete={handleVoiceRecordingComplete} onCancel={() => setShowVoiceRecorder(false)} />}
      {selectedMedia && <MediaViewerModal media={selectedMedia} allMedia={allMediaAttachments} onClose={() => setSelectedMedia(null)} />}
    </>
  );
}