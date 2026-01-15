"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence, type MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { unbounded, timesRoman } from "../fonts";
import {
  Search,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Hammer,
  Zap,
  Droplets,
  Paintbrush,
  Truck,
  Wrench,
  Star,
  Smartphone,
  Wallet,
  Briefcase,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-background selection:bg-accent selection:text-primary">
      <HeroSection opacity={opacity} scale={scale} y={y} />
      <CategorySection />
      <ValuePropSection />
      <ForWorkersSection />
      <SecuritySection />
      <CTASection />
    </main>
  );
}

// --- Components ---

function HeroSection({ opacity, scale, y }: { opacity: MotionValue<number>; scale: MotionValue<number>; y: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);
  
  const services = ["Plumber", "Electrician", "Cleaner", "Carpenter"];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[20%] w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-blob" />
      </div>

      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/10 bg-white/50 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-sm font-medium text-foreground/80">
            Serve-U is now live in your area
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`${unbounded.className} text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[1.1] mb-6`}
        >
          Expert help for your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-primary/80">
            home & lifestyle
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className=" h-0 mb-8 flex items-center justify-center gap-2 text-2xl md:text-3xl text-foreground/60 "
        >
          <h2 className={`${timesRoman.className} italic my-auto h-full`}>I need a</h2>
          <div className="relative w-[180px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={services[activeService]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute left-0 top-0 ${unbounded.className} text-primary font-bold`}
              >
                {services[activeService]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Search Bar Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto bg-white rounded-full p-2 shadow-2xl shadow-primary/10 border border-primary/5 flex items-center mb-12"
        >
          <div className="flex-1 px-6 py-2 border-r border-gray-100">
            <div className="text-xs text-foreground/40 font-medium uppercase tracking-wider mb-1">Service</div>
            <input 
              type="text" 
              placeholder="What do you need help with?" 
              className="w-full bg-transparent border-none p-0 text-foreground placeholder:text-foreground/30 focus:ring-0 text-lg font-medium"
            />
          </div>
          <div className="px-6 py-2 hidden md:block">
            <div className="text-xs text-foreground/40 font-medium uppercase tracking-wider mb-1">Location</div>
            <div className="text-foreground font-medium flex items-center gap-2 cursor-pointer">
              <span className="truncate max-w-[100px]">Current Location</span>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-lg hover:shadow-primary/25">
            <Search className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Floating Icons (Decorative) */}
        <FloatingIcon icon={Wrench} className="top-1/4 left-[10%] text-accent rotate-[-12deg]" delay={0} />
        <FloatingIcon icon={Zap} className="bottom-1/4 right-[10%] text-primary rotate-[12deg]" delay={1.5} />
        <FloatingIcon icon={Paintbrush} className="top-1/3 right-[15%] text-purple-400 rotate-[6deg]" delay={0.8} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gray-200 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-foreground/60"><span className="font-bold text-foreground">10,000+</span> verified reviews</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingIcon({ icon: Icon, className, delay }: { icon: LucideIcon, className: string, delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute hidden lg:flex w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl items-center justify-center border border-white/50 ${className}`}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
  );
}

function CategorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { icon: Hammer, name: "Repairs", color: "bg-orange-100 text-orange-600" },
    { icon: Droplets, name: "Plumbing", color: "bg-blue-100 text-blue-600" },
    { icon: Zap, name: "Electrical", color: "bg-yellow-100 text-yellow-600" },
    { icon: Paintbrush, name: "Painting", color: "bg-purple-100 text-purple-600" },
    { icon: Truck, name: "Moving", color: "bg-green-100 text-green-600" },
    { icon: Wrench, name: "Assembly", color: "bg-red-100 text-red-600" },
  ];

  return (
    <section ref={ref} className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`${unbounded.className} text-3xl md:text-4xl font-bold mb-4`}>
              Popular Services
            </h2>
            <p className={`${timesRoman.className} text-xl text-foreground/60 italic`}>
              &ldquo;Whatever you need, we&apos;ve got a pro for that.&rdquo;
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/services" className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
              View all services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-primary/10 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <span className="font-semibold text-foreground">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePropSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Verified Professionals",
      desc: "Every worker undergoes strict ID verification and background checks.",
      icon: Shield,
    },
    {
      title: "Transparent Pricing",
      desc: "Get quotes upfront. Pay securely in-app or cash on delivery.",
      icon: Wallet,
    },
    {
      title: "Track in Real-Time",
      desc: "Know exactly when your pro will arrive with live status updates.",
      icon: Clock,
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Why Serve-U?</span>
            <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold mb-6`}>
              Peace of mind is <br /> part of the service.
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              We don&apos;t just connect you with workers; we ensure a safe, reliable, and premium experience from booking to completion.
            </p>

            <div className="space-y-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-foreground/60">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 max-w-md mx-auto transform rotate-[-2deg]">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Worker" />
                </div>
                <div>
                  <h4 className="font-bold">John The Plumber</h4>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star className="w-3 h-3 fill-current" /> 4.9 (124 jobs)
                  </div>
                </div>
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  Verified
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="h-2 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-1/2" />
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-primary text-white rounded-xl font-medium text-sm">
                  Accept Quote
                </button>
                <button className="px-4 py-3 border border-gray-200 rounded-xl">
                  <Smartphone className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Decorative background card */}
            <div className="absolute top-4 left-4 right-[-1rem] bottom-[-1rem] bg-accent/20 rounded-3xl -z-10 transform rotate-[3deg]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ForWorkersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent rounded-full blur-3xl opacity-20" />
              <img 
                src="https://images.unsplash.com/photo-1621905476059-5f3460af5619?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional Worker" 
                className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/10"
              />
              <div className="absolute -bottom-6 -right-6 bg-white text-primary p-6 rounded-2xl shadow-xl z-20 max-w-[200px]">
                <div className="text-3xl font-black font-mono mb-1">$2.4k</div>
                <div className="text-sm font-medium opacity-80">Earned this week</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Briefcase className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">For Professionals</span>
            </div>
            
            <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold mb-6`}>
              Grow your business <br />
              <span className="text-accent">on your terms.</span>
            </h2>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Join thousands of skilled professionals finding new customers every day. 
              Set your own prices, manage your schedule, and get paid instantly.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "0% commission for the first month",
                "Instant payouts to your bank account",
                "Dedicated support team"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/register?role=worker">
              <button className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-accent/20">
                Become a Worker
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className={`${unbounded.className} text-3xl font-bold mb-12`}>Trusted by the best</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholders for logos */}
           <div className="h-12 flex items-center justify-center font-bold text-xl">STRIPE</div>
           <div className="h-12 flex items-center justify-center font-bold text-xl">AWS</div>
           <div className="h-12 flex items-center justify-center font-bold text-xl">VERIFF</div>
           <div className="h-12 flex items-center justify-center font-bold text-xl">AUTH0</div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-primary z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto relative z-10 text-center text-white"
      >
        <h2 className={`${unbounded.className} text-5xl md:text-6xl font-black mb-8`}>
          Ready to get started?
        </h2>
        <p className={`${timesRoman.className} text-2xl text-white/70 italic mb-12 max-w-2xl mx-auto`}>
          &ldquo;The easiest way to get your to-do list done, or start earning from your skills.&rdquo;
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <button className="px-10 py-5 bg-accent text-primary rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_40px_-10px_rgba(167,255,119,0.5)]">
              Find a Service
            </button>
          </Link>
          <Link href="/register?role=worker">
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Join as a Pro
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}