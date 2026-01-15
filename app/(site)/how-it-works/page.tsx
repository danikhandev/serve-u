"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Search, Calendar, MessageSquare, Star, UserPlus, Briefcase, DollarSign, Award } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const consumerSteps = [
    {
      icon: Search,
      title: "Find Your Pro",
      description: "Search our marketplace of verified professionals. Filter by category, rating, and price to find the perfect fit for your job."
    },
    {
      icon: Calendar,
      title: "Book & Schedule",
      description: "View profiles, compare services, and send a booking request directly. Propose a time that works for you."
    },
    {
      icon: MessageSquare,
      title: "Collaborate & Track",
      description: "Use our secure chat to communicate with your pro, share details, and track the status of your job from start to finish."
    },
    {
      icon: Star,
      title: "Pay & Review",
      description: "Once the job is complete, pay securely through our platform. Leave a review to help build a trusted community."
    }
  ];

  const workerSteps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up as a pro and build your profile. Showcase your skills, experience, and add a portfolio of your best work."
    },
    {
      icon: Briefcase,
      title: "List Your Services",
      description: "Define the services you offer with clear pricing. Set your own rates—fixed, hourly, or by quotation."
    },
    {
      icon: CheckCircle,
      title: "Get Hired",
      description: "Receive job requests from consumers in your area. Review the details and accept the jobs that fit your schedule."
    },
    {
      icon: DollarSign,
      title: "Get Paid & Grow",
      description: "Get paid securely for your work. Earn positive reviews to boost your reputation and attract more clients."
    }
  ];

  return (
    <div className="bg-white pt-24 pb-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-16 pb-24 bg-primary/5"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">How Serve-U Works</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your simple, trusted solution for getting things done and growing your business.
          </p>
        </div>
      </motion.div>

      {/* For Consumers Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Consumers</h2>
            <p className="text-lg text-gray-600">
              Finding reliable help for your home has never been easier. Follow these simple steps to get your to-do list done.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consumerSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/search" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg">
              Find a Pro Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* For Workers Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Professionals</h2>
            <p className="text-lg text-gray-600">
              Join our network of skilled professionals and take control of your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workerSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 bg-accent/20 text-green-700 rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/worker/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors shadow-lg">
              Become a Pro <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
