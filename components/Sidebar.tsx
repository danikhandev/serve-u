"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  BookOpen,
  BarChart3,
  UserCircle,
  Briefcase,
  Layers,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useAdmin } from "@/contexts/AdminContext";

interface SidebarProps {
  type: "worker" | "consumer" | "admin"; // Renamed 'patient' to 'consumer'
}

export default function Sidebar({ type }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout: userLogout, activePerspective } = useUser();
  const { admin, logout: adminLogout } = useAdmin();

  // Don't show sidebar on superadmin login page
  if (type === "admin" && pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      if (type === "admin") {
        adminLogout();
        router.push("/admin/login");
      } else {
        userLogout();
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const consumerMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Requests", href: "/dashboard/requests" },
    { icon: UserCircle, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const workerMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/worker/dashboard" },
    { icon: Briefcase, label: "My Jobs", href: "/worker/dashboard/jobs" },
    { icon: DollarSign, label: "Earnings", href: "/worker/dashboard/earnings" },
    { icon: UserCircle, label: "Profile", href: "/worker/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/worker/dashboard/settings" },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "Users", href: "/admin/dashboard/users" },
    { icon: Briefcase, label: "Workers", href: "/admin/dashboard/workers" },
    { icon: Layers, label: "Categories", href: "/admin/dashboard/categories" },
    { icon: Settings, label: "Configuration", href: "/admin/dashboard/configuration" },
    { icon: BarChart3, label: "Analytics", href: "/admin/dashboard/analytics" },
  ];

  let menuItems;
  let basePath;

  if (type === "admin") {
    menuItems = adminMenuItems;
    basePath = "/admin/dashboard";
  } else if (activePerspective === "worker" && user?.isUserSignUpForWorker) {
    menuItems = workerMenuItems;
    basePath = "/worker/dashboard";
  } else {
    // Default to consumer view
    menuItems = consumerMenuItems;
    basePath = "/dashboard";
  }


  const sidebarVariants = {
    open: { width: "240px" },
    closed: { width: "80px" },
  };

  const mobileSidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const displayName = type === "admin" 
    ? admin?.name || "Super Admin"
    : user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "User";

  const displayRole = type === "admin" 
    ? "Super Admin" 
    : user?.isUserSignUpForWorker 
      ? (activePerspective === "worker" ? "Worker Account" : "Consumer Account")
      : "Consumer Account";

  return (
    <>
      {/* Mobile Hamburger Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-gradient-to-br from-primary to-secondary text-background rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-background border-r border-primary/20 shadow-xl z-40 transition-all duration-300"
      >
        {/* Header */}
        <div
          className={`${
            isOpen ? "px-6" : "px-2"
          } py-3 border-b border-primary/20 relative`}
        >
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.div
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-background" />
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-foreground text-lg line-clamp-1">
                    {displayName}
                  </h2>
                  <p className="text-xs text-foreground/60">
                    {displayRole}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-background" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer bg-gradient-to-br from-primary to-secondary text-background rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "mx-0" : "mx-auto"
          } flex-1 overflow-y-auto py-3 px-3 scrollbar-hide`}
        >
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              // Check if pathname matches exactly or starts with the href (for nested routes)
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`group flex items-center gap-3 px-2 py-2 transition-all duration-200 border-b-[1.5px] ${
                    isActive
                      ? "text-primary border-primary bg-primary/5"
                      : "text-foreground/70 border-transparent hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="group cursor-pointer flex items-center gap-3 w-full px-3 py-3 rounded-xl text-foreground/70 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm whitespace-nowrap overflow-hidden"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileSidebarVariants}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-background shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Shield className="w-6 h-6 text-background" />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold text-foreground text-lg">
                      {displayName}
                    </h2>
                    <p className="text-xs text-foreground/60">
                      {displayRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-3 px-3 scrollbar-hide">
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`group flex items-center gap-3 px-4 py-2 transition-all duration-200 border-b-2 ${
                          isActive
                            ? "text-primary border-primary bg-primary/5"
                            : "text-foreground/70 border-transparent hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-primary/20">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-foreground/70 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for desktop - pushes content to the right */}
      <div
        className={`hidden lg:block transition-all duration-[1000ms] ${
          isOpen ? "w-[240px]" : "w-[80px]"
        }`}
      />
    </>
  );
}
