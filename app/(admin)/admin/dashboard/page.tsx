'use client';

import DashboardHeader from '@/components/DashboardHeader';
import { Users, Briefcase, Calendar, CheckCircle, TrendingUp, AlertCircle, DollarSign, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const stats = [
    {
      icon: Briefcase,
      label: 'Active Workers',
      value: '147',
      change: '+12 this month',
      color: 'from-primary to-secondary',
    },
    {
      icon: Users,
      label: 'Total Consumers',
      value: '2,834',
      change: '+156 this month',
      color: 'from-secondary to-accent',
    },
    {
      icon: Calendar,
      label: 'Jobs Today',
      value: '89',
      change: '23 pending',
      color: 'from-accent to-primary',
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '120k PKR',
      change: '+8% vs last week',
      color: 'from-primary to-accent',
    },
  ];

  const pendingWorkerApprovals = [
    {
      name: 'John Smith',
      category: 'Plumbing',
      registeredDate: '2 hours ago',
      documents: 4,
    },
    {
      name: 'Haroon',
      category: 'Electrical',
      registeredDate: '5 hours ago',
      documents: 3,
    },
    {
      name: 'Mike Williams',
      category: 'Cleaning',
      registeredDate: '1 day ago',
      documents: 2,
    },
    {
      name: 'David Lee',
      category: 'Landscaping',
      registeredDate: '1 day ago',
      documents: 5,
    },
  ];

  const recentJobs = [
    {
      consumer: 'Alice Brown',
      worker: 'John Smith',
      service: 'Fix Leaky Faucet',
      time: 'Today, 2:00 PM',
      status: 'confirmed',
    },
    {
      consumer: 'Emma Davis',
      worker: 'Haroon',
      service: 'Install Ceiling Fan',
      time: 'Today, 3:30 PM',
      status: 'pending',
    },
    {
      consumer: 'Michael Wilson',
      worker: 'David Lee',
      service: 'Lawn Mowing',
      time: 'Today, 4:00 PM',
      status: 'confirmed',
    },
    {
      consumer: 'Olivia Garcia',
      worker: 'Pending Assignment',
      service: 'House Cleaning (3 Bed)',
      time: 'Today, 5:15 PM',
      status: 'pending',
    },
  ];

  const popularCategories = [
    { name: 'Cleaning', count: 342, percentage: 28 },
    { name: 'Plumbing', count: 256, percentage: 21 },
    { name: 'Electrical', count: 198, percentage: 16 },
    { name: 'Moving', count: 165, percentage: 14 },
    { name: 'Landscaping', count: 143, percentage: 12 },
    { name: 'Painting', count: 110, percentage: 9 },
  ];

  const jobStats = [
    { status: 'Pending', count: 23, color: 'bg-yellow-500' },
    { status: 'Confirmed', count: 45, color: 'bg-green-500' },
    { status: 'Completed', count: 18, color: 'bg-blue-500' },
    { status: 'Cancelled', count: 3, color: 'bg-red-500' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <DashboardHeader
          title="Admin Dashboard"
        />

        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-primary/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-background" />
                  </div>
                </div>
                <h3 className="text-sm text-foreground/60 mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-xs text-primary">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pending Worker Approvals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-background border border-primary/20 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Pending Worker Approvals</h2>
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  {pendingWorkerApprovals.length} Pending
                </span>
              </div>
              <div className="space-y-4">
                {pendingWorkerApprovals.map((worker, index) => (
                  <div key={index} className="flex items-start justify-between pb-4 border-b border-primary/10 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{worker.name}</p>
                      <p className="text-xs text-foreground/60 mt-1">{worker.category}</p>
                      <p className="text-xs text-foreground/40 mt-1">{worker.documents} documents uploaded</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-foreground/60">{worker.registeredDate}</span>
                      <button className="text-xs px-3 py-1 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Jobs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-background border border-primary/20 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Jobs</h2>
              <div className="space-y-4">
                {recentJobs.map((job, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-primary/10 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${job.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{job.service}</p>
                      <p className="text-xs text-foreground/60 mt-1">{job.consumer} → {job.worker}</p>
                      <p className="text-xs text-foreground/40 mt-1">{job.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${job.status === 'pending'
                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                      {job.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Popular Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-background border border-primary/20 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Popular Categories</h2>
              <div className="space-y-4">
                {popularCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{category.name}</span>
                      <span className="text-sm font-semibold text-foreground">{category.count}</span>
                    </div>
                    <div className="w-full bg-primary/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Job Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-background border border-primary/20 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Job Status Today</h2>
              <div className="space-y-4">
                {jobStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-primary/10 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                      <span className="text-sm text-foreground">{stat.status}</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{stat.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-background border border-primary/20 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-left">
                <AlertCircle className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Review Workers</h3>
                <p className="text-sm text-foreground/60">4 pending approvals</p>
              </button>
              <button className="p-4 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-left">
                <CheckCircle className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Verify IDs</h3>
                <p className="text-sm text-foreground/60">12 certifications</p>
              </button>
              <button className="p-4 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-left">
                <Activity className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Monitor Jobs</h3>
                <p className="text-sm text-foreground/60">12 active now</p>
              </button>
              <button className="p-4 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors text-left">
                <TrendingUp className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Financials</h3>
                <p className="text-sm text-foreground/60">View revenue</p>
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}