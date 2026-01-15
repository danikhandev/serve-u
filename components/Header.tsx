"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Shield, LogIn, User2, MessageSquare, Bell, LogOut, LayoutDashboard, Hammer, Zap, Droplets, Paintbrush, Truck, Briefcase, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { unbounded } from "@/app/fonts";
import { useUser } from "@/contexts/UserContext";

// Static Categories for Serve-U (assuming SparklesIcon is defined elsewhere or replaced)
const SERVICE_CATEGORIES = [
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    icon: Droplets,
    description: "Fix leaks, unclog drains, and install fixtures.",
    popular: ["Leak Repair", "Drain Cleaning", "Toilet Installation"]
  },
  {
    id: "electrical",
    name: "Electrical",
    slug: "electrical",
    icon: Zap,
    description: "Wiring, lighting, and electrical repairs.",
    popular: ["Light Fixture", "Outlet Repair", "Full Rewiring"]
  },
  {
    id: "cleaning",
    name: "Cleaning",
    slug: "cleaning",
    icon: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>, 
    description: "Home and office cleaning services.",
    popular: ["Standard Clean", "Deep Clean", "Move-out Clean"]
  },
  {
    id: "painting",
    name: "Painting",
    slug: "painting",
    icon: Paintbrush,
    description: "Interior and exterior painting.",
    popular: ["Interior Walls", "Exterior House", "Cabinet Painting"]
  },
  {
    id: "moving",
    name: "Moving",
    slug: "moving",
    icon: Truck,
    description: "Help with moving boxes and furniture.",
    popular: ["Local Moving", "Furniture Assembly", "Junk Removal"]
  },
  {
    id: "general",
    name: "General Repair",
    slug: "general-repair",
    icon: Hammer,
    description: "General handyman tasks around the house.",
    popular: ["Furniture Repair", "Drywall Fix", "Mounting TV"]
  }
];


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof SERVICE_CATEGORIES[0] | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { user, logout, activePerspective, switchPerspective } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // Clear search query after submission
  };

  const handleSwitchPerspective = (perspective: "consumer" | "worker") => {
    switchPerspective(perspective);
    if (perspective === "consumer") {
      router.push("/dashboard");
    } else {
      router.push("/worker/dashboard");
    }
  };

  const currentDashboardLink = activePerspective === "consumer" ? "/dashboard" : "/worker/dashboard";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
            : "bg-white/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <span
                className={`${unbounded.className} text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors`}
              >
                Serve-U
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              
              {/* Find a Service Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("find-service")}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveCategory(null);
                }}
              >
                <button 
                  className={`flex items-center gap-1 transition-colors font-medium text-sm group ${
                    activeDropdown === "find-service" ? "text-primary" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Find a Service
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "find-service" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "find-service" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-xl shadow-2xl border border-gray-100 flex h-[350px] z-50 overflow-hidden"
                    >
                      {/* Left: Category List */}
                      <div className="w-1/3 bg-gray-50 border-r border-gray-100 py-4">
                        {SERVICE_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onMouseEnter={() => setActiveCategory(cat)}
                            className={`w-full text-left px-6 py-3 text-sm font-medium flex items-center justify-between group transition-colors ${
                              activeCategory?.id === cat.id
                                ? "bg-white text-primary border-l-4 border-primary"
                                : "text-gray-600 hover:bg-gray-100 hover:text-primary border-l-4 border-transparent"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <cat.icon className="w-4 h-4" />
                              {cat.name}
                            </span>
                            {activeCategory?.id === cat.id && <ChevronRight className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>

                      {/* Right: Details */}
                      <div className="w-2/3 p-8 bg-white relative">
                        {activeCategory ? (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={activeCategory.id}
                            className="h-full flex flex-col"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <activeCategory.icon className="w-6 h-6" />
                              </div>
                              <h3 className={`${unbounded.className} text-xl font-bold text-gray-900`}>
                                {activeCategory.name}
                              </h3>
                            </div>
                            <p className="text-gray-500 text-sm mb-6">{activeCategory.description}</p>
                            
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                              Popular Services
                            </h4>
                            <div className="grid grid-cols-2 gap-3 mb-auto">
                              {activeCategory.popular.map((item) => (
                                <Link
                                  key={item}
                                  href={`/search?category=${activeCategory.slug}&q=${item}`}
                                  className="text-sm text-gray-600 hover:text-primary hover:underline"
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>

                            <Link 
                              href={`/search?category=${activeCategory.slug}`}
                              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors w-fit"
                            >
                              Explore all {activeCategory.name}
                            </Link>
                          </motion.div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Search className="w-12 h-12 mb-4 opacity-20" />
                            <p>Hover over a category to see details</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/how-it-works"
                className="text-gray-600 hover:text-primary transition-colors font-medium text-sm relative group"
              >
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>

              {/* Become a Pro */}
              {!user?.isUserSignUpForWorker && (
                <Link
                  href="/worker/onboarding"
                  className="text-gray-600 hover:text-primary transition-colors font-medium text-sm relative group"
                >
                  Join as a Pro
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              )}
            </div>

            {/* Desktop CTA Buttons / Logged In State */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Global Search Input */}
              <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 border border-gray-200 rounded-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-transparent transition-all text-sm"
                />
              </form>

              {user ? (
                <>
                  {/* Switch Roles Button (If user is also a worker) */}
                  {user.isUserSignUpForWorker && (
                    <div className="relative">
                      <button 
                        onClick={() => handleSwitchPerspective(activePerspective === "consumer" ? "worker" : "consumer")}
                        className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        Switch to {activePerspective === "consumer" ? "Worker" : "Consumer"} View
                      </button>
                    </div>
                  )}

                  {/* Chat Icon */}
                  <Link href="/chat" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </Link>

                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>

                  {/* User Profile */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowProfileMenu(true)}
                    onMouseLeave={() => setShowProfileMenu(false)}
                  >
                    <button className="flex items-center gap-2 pl-2">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold border border-primary/20 overflow-hidden">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <User2 className="w-5 h-5" />
                        )}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showProfileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-100 mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          
                          <Link href={currentDashboardLink} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          
                          {/* Worker Link in Menu */}
                          {user.isUserSignUpForWorker ? (
                             <Link href="/worker/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                               <Briefcase className="w-4 h-4" />
                               Worker Dashboard
                             </Link>
                          ) : (
                             <Link href="/worker/onboarding" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                               <Hammer className="w-4 h-4" />
                               Become a Worker
                             </Link>
                          )}

                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/register"
                      className="px-6 py-2.5 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Join Now
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6 flex flex-col"
          >
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Services</h3>
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/search?category=${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium text-gray-800"
                  >
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <cat.icon className="w-5 h-5 text-primary" />
                    </div>
                    {cat.name}
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-gray-800">
                  How it Works
                </Link>
                {!user?.isUserSignUpForWorker && (
                  <Link href="/worker/onboarding" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-primary">
                    Join as a Pro
                  </Link>
                )}
              </div>
            </div>

            <div className="py-8 border-t border-gray-100">
              {user ? (
                <div className="space-y-3">
                  <Link 
                    href={currentDashboardLink} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-medium"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl font-medium text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link 
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-3 text-center border border-gray-200 rounded-xl font-medium"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-3 text-center bg-primary text-white rounded-xl font-medium"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
