"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function UserDashboardPage() {
  const activeRequests = [
    {
      id: "req-1",
      worker: "Haroon Ahmed",
      service: "Leak Repair",
      status: "IN_PROGRESS",
      date: "Today, 2:00 PM",
      price: "1500 PKR",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haroon"
    },
    {
      id: "req-2",
      worker: "Haroon Ahmed",
      service: "Lighting Install",
      status: "PENDING",
      date: "Tomorrow, 10:00 AM",
      price: "1200 PKR",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-500">Welcome back</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Requests</p>
                <h3 className="text-2xl font-bold text-gray-900">2</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Jobs</p>
                <h3 className="text-2xl font-bold text-gray-900">12</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unread Messages</p>
                <h3 className="text-2xl font-bold text-gray-900">3</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Active Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Active Requests</h2>
              <Link href="/requests" className="text-sm text-primary font-medium hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {activeRequests.map((req) => (
                <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors">
                  <img src={req.avatar} alt={req.worker} className="w-12 h-12 rounded-full bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{req.service}</h4>
                    <p className="text-sm text-gray-500">{req.worker}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold px-2 py-1 rounded-full mb-1 inline-block ${req.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {req.status.replace("_", " ")}
                    </div>
                    <p className="text-xs text-gray-500">{req.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/search" className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center group">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-gray-900">Book New Service</h3>
              </Link>
              <Link href="/profile" className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center group">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-gray-900">View History</h3>
              </Link>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900">Complete your profile</h4>
                  <p className="text-xs text-blue-700 mt-1">Add your address to get faster bookings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
