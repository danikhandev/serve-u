"use client";
import { motion } from 'framer-motion';
import { DollarSign, Briefcase, Star, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

export default function WorkerDashboardPage() {
  const { user } = useUser();

  const stats = [
    { label: "Earnings (Month)", value: "$2,450", icon: DollarSign, color: "green" },
    { label: "Active Jobs", value: "3", icon: Briefcase, color: "blue" },
    { label: "Avg. Rating", value: "4.9", icon: Star, color: "yellow" },
    { label: "Completion Rate", value: "98%", icon: TrendingUp, color: "purple" },
  ];

  const newJobRequests = [
    { id: "job-1", service: "Kitchen Sink Repair", consumer: "Alex Consumer", date: "Today, 5:00 PM" },
    { id: "job-2", service: "Ceiling Fan Installation", consumer: "Jane Doe", date: "Tomorrow, 11:00 AM" },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Worker Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.firstName}!</p>
      </motion.div>

      {/* Onboarding Checklist Reminder */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <div>
            <h4 className="font-bold text-yellow-900">Complete Your Profile!</h4>
            <p className="text-sm text-yellow-800">Finish setting up your account to start accepting jobs.</p>
          </div>
        </div>
        <Link href="/worker/onboarding" className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold text-sm rounded-lg hover:bg-yellow-500 transition-colors">
          Continue
        </Link>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Job Requests */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">New Job Requests</h2>
        <div className="space-y-4">
          {newJobRequests.map(job => (
            <div key={job.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-100 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800">{job.service}</p>
                <p className="text-sm text-gray-500">From {job.consumer}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4"/> {job.date}</span>
                <Link href={`/worker/jobs/${job.id}`} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
