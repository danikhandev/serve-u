"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  conversationId?: string;
  onNewMessage?: (message: any) => void;
  onUserTyping?: (data: { userId: string; isTyping: boolean }) => void;
  onMessagesRead?: (data: { messageIds: string[]; readBy: string }) => void;
  onUserStatus?: (data: { userId: string; status: "online" | "offline" }) => void;
}

export function useSocket(options: UseSocketOptions = {}) {
  const {
    conversationId,
    onNewMessage,
    onUserTyping,
    onMessagesRead,
    onUserStatus,
  } = options;

  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store latest callbacks in refs to avoid recreating socket connection
  const onNewMessageRef = useRef(onNewMessage);
  const onUserTypingRef = useRef(onUserTyping);
  const onMessagesReadRef = useRef(onMessagesRead);
  const onUserStatusRef = useRef(onUserStatus);

  // Update refs when callbacks change
  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
    onUserTypingRef.current = onUserTyping;
    onMessagesReadRef.current = onMessagesRead;
    onUserStatusRef.current = onUserStatus;
  }, [onNewMessage, onUserTyping, onMessagesRead, onUserStatus]);

  useEffect(() => {
    // Initialize Socket.io connection
    const socket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    // Connection handlers
    socket.on("connect", () => {
      console.log("Socket.io connected");
      setIsConnected(true);
      setError(null);

      // Join conversation room if conversationId is provided
      if (conversationId) {
        socket.emit("join-conversation", conversationId);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket.io disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.io connection error:", err);
      setError(err.message);
      setIsConnected(false);
    });

    // Message handlers - use refs to get latest callbacks
    socket.on("new-message", (message: any) => {
      if (onNewMessageRef.current) {
        onNewMessageRef.current(message);
      }
    });

    socket.on("user-typing", (data: { userId: string; isTyping: boolean }) => {
      if (onUserTypingRef.current) {
        onUserTypingRef.current(data);
      }
    });

    socket.on("messages-read", (data: { messageIds: string[]; readBy: string; conversationId: string }) => {
      if (onMessagesReadRef.current) {
        onMessagesReadRef.current(data);
      }
    });

    socket.on("user-status", (data: { userId: string; status: "online" | "offline" }) => {
      if (onUserStatusRef.current) {
        onUserStatusRef.current(data);
      }
    });

    // Cleanup on unmount
    return () => {
      if (conversationId) {
        socket.emit("leave-conversation", conversationId);
      }
      socket.disconnect();
    };
  }, [conversationId]);

  // Send message
  const sendMessage = useCallback((message: any) => {
    if (socketRef.current && isConnected && conversationId) {
      socketRef.current.emit("send-message", {
        conversationId,
        message,
      });
    }
  }, [isConnected, conversationId]);

  // Send typing indicator
  const sendTyping = useCallback((isTyping: boolean) => {
    if (socketRef.current && isConnected && conversationId) {
      socketRef.current.emit("typing", {
        conversationId,
        isTyping,
      });
    }
  }, [isConnected, conversationId]);

  // Mark messages as read
  const markMessagesRead = useCallback((messageIds: string[]) => {
    if (socketRef.current && isConnected && conversationId) {
      socketRef.current.emit("mark-read", {
        conversationId,
        messageIds,
      });
    }
  }, [isConnected, conversationId]);

  return {
    socket: socketRef.current,
    isConnected,
    error,
    sendMessage,
    sendTyping,
    markMessagesRead,
  };
}
