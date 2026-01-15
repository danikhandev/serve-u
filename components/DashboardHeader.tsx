"use client";

import { useState } from "react";
import { Bell, User2, MessageSquare, Repeat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useAdmin } from "@/contexts/AdminContext";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title = "",
  subtitle,
}: DashboardHeaderProps) {
  const { user, activePerspective, switchPerspective } = useUser();
  const { admin } = useAdmin();
  const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);

  // Mock Notifications
  const notifications = [
    { id: 1, title: "Job Update", message: "Your plumbing request has been accepted.", time: "2m ago", read: false },
    { id: 2, title: "New Message", message: "John Smith sent you a message.", time: "1h ago", read: false },
    { id: 3, title: "System", message: "Welcome to Serve-U Dashboard!", time: "3h ago", read: true },
  ];

  const handleSwitchPerspective = () => {
    const newPerspective = activePerspective === 'consumer' ? 'worker' : 'consumer';
    switchPerspective(newPerspective);
    const newPath = newPerspective === 'worker' ? '/worker/dashboard' : '/dashboard';
    router.push(newPath);
  };
  
  // Determine which user is logged in and get display info
  const getUserInfo = () => {
    if (admin) {
      return {
        displayName: admin.name || "Admin",
        displayRole: "Super Admin",
        profileImage: null,
      };
    }

    if (user) {
      return {
        displayName:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email?.split("@")[0] || "User",
        displayRole: user.isUserSignUpForWorker 
          ? (activePerspective === "worker" ? "Worker View" : "Consumer View")
          : "Consumer View",
        profileImage: user.avatar,
      };
    }

    // Default fallback
    return {
      displayName: "Guest",
      displayRole: "Guest",
      profileImage: null,
    };
  };

  const { displayName, displayRole, profileImage } = getUserInfo();

  return (
    <div className="bg-background border-b border-primary/20 sticky top-0 z-30">
      <div className="pr-6 pl-18 lg:pl-6 py-3">
        <div className="flex items-center justify-between">
          {/* Title Section */}
          <div className="flex items-center gap-4">
            {title && (
              <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                {subtitle && <p className="text-sm text-foreground/60">{subtitle}</p>}
              </div>
            )}
          </div>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="flex items-center gap-4">
            
            {/* Role Switcher */}
            {user?.isUserSignUpForWorker && (
              <button 
                onClick={handleSwitchPerspective}
                className="hidden sm:flex items-center gap-2 text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Repeat className="w-4 h-4" />
                Switch to {activePerspective === 'consumer' ? 'Worker' : 'Consumer'} View
              </button>
            )}

            {/* Chat Icon */}
            <Link href="/chat" className="relative p-2 text-foreground/70 hover:text-primary transition-colors">
              <MessageSquare className="w-5 h-5" />
            </Link>

            {/* Notifications */}
            <div 
              className="relative"
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <button className="relative p-2 text-foreground/70 hover:text-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 font-semibold text-sm text-gray-900">
                      Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${notif.read ? 'opacity-70' : ''}`}>
                          <p className="text-sm font-medium text-gray-900 text-left">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 text-left">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1 text-left">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <Link href="/notifications" className="text-xs text-primary font-medium hover:underline">
                        View all
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-primary/20">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {displayName}
                </p>
                <p className="text-xs text-foreground/60">{displayRole}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User2
                    strokeWidth="1.5px"
                    className="w-6 h-6 text-background"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
