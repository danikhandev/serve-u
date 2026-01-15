"use client";

import { MessageCircle, Mic, Paperclip, Video, Shield } from "lucide-react";

export default function ChatEmptyState() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-2xl font-semibold text-text mb-2">
          Welcome to Secure Messaging
        </h2>

        <p className="text-sm text-text/60 mb-8">
          Select a conversation from the sidebar to start chatting with your
          {" "}healthcare provider or patient
        </p>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-primary/10 mb-6">
          <h3 className="text-sm font-semibold text-text mb-4">
            Getting Started
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-text/80">
                  Select a conversation from the sidebar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-text/80">
                  Type your message or use the attachment button
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-text/80">
                  Share files, images, or record voice notes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-text/70">Text Messages</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-text/70">Voice Notes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Paperclip className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-text/70">File Sharing</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-text/50">
          <Shield className="w-4 h-4" />
          <span>Your conversations are secure and private</span>
        </div>
      </div>
    </div>
  );
}
