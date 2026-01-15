"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { unbounded } from "@/app/fonts";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Don't show footer on chat pages
  if (pathname?.startsWith("/chat")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setIsSubscribed(false);
    }, 3000);
  };

  const footerLinks = {
    services: [
      { name: "Plumbing", href: "/services/plumbing" },
      { name: "Electrical", href: "/services/electrical" },
      { name: "Cleaning", href: "/services/cleaning" },
      { name: "Painting", href: "/services/painting" },
      { name: "Moving", href: "/services/moving" },
      { name: "Landscaping", href: "/services/landscaping" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Trust & Safety", href: "/trust" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Community Guidelines", href: "/community-guidelines" },
    ],
    forWorkers: [
      { name: "Become a Worker", href: "/worker/onboarding" },
      { name: "Success Stories", href: "/worker/stories" },
      { name: "Resources", href: "/worker/resources" },
      { name: "Insurance", href: "/worker/insurance" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-[#1DA1F2]" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-[#0A66C2]" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-[#1877F2]" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-[#E4405F]" },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <span
                className={`${unbounded.className} text-2xl font-bold text-white group-hover:text-accent transition-colors`}
              >
                Serve-U
              </span>
            </Link>

            <p className="text-white/70 mb-8 leading-relaxed max-w-sm">
              The trusted marketplace for home services. Connecting you with verified professionals for every job, big or small.
            </p>

            <div className="flex flex-col gap-4">
              <a href="mailto:support@serve-u.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                support@serve-u.com
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Sydney, Australia</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 text-lg">For Workers</h3>
            <ul className="space-y-3">
              {footerLinks.forWorkers.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className="border-t border-white/10 pt-12 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Socials */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-white/30 transition-colors">
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-white placeholder:text-white/40 focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {isSubscribed ? <CheckCircle2 className="w-4 h-4" /> : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Serve-U.</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current hidden sm:inline" />
            <span className="hidden sm:inline">for the community.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}