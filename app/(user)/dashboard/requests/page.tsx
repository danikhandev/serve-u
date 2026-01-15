"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, Search, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";

// Mock data for service requests
const mockRequests = [
  {
    id: "req-1",
    service: "Emergency Leak Repair",
    worker: "Sarah Smith",
    status: "IN_PROGRESS",
    date: "2026-01-15T14:00:00Z",
    price: 150,
  },
  {
    id: "req-2",
    service: "Lighting Installation",
    worker: "Mike Ross",
    status: "PENDING",
    date: "2026-01-16T10:00:00Z",
    price: 120,
  },
  {
    id: "req-3",
    service: "Garden Maintenance",
    worker: "David Kim",
    status: "COMPLETED",
    date: "2026-01-10T09:00:00Z",
    price: 180,
  },
  {
    id: "req-4",
    service: "Full House Deep Clean",
    worker: "Jenny Doe",
    status: "COMPLETED",
    date: "2026-01-05T11:00:00Z",
    price: 250,
  },
  {
    id: "req-5",
    service: "Custom Carpentry",
    worker: "Mike Ross",
    status: "CANCELLED",
    date: "2026-01-02T12:00:00Z",
    price: 500,
  },
];

const statusConfig = {
  PENDING: { icon: Clock, color: "text-yellow-600 bg-yellow-50 border-yellow-100", label: "Pending" },
  IN_PROGRESS: { icon: Clock, color: "text-blue-600 bg-blue-50 border-blue-100", label: "In Progress" },
  COMPLETED: { icon: CheckCircle, color: "text-green-600 bg-green-50 border-green-100", label: "Completed" },
  CANCELLED: { icon: XCircle, color: "text-red-600 bg-red-50 border-red-100", label: "Cancelled" },
};

export default function MyRequestsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRequests = mockRequests.filter(req => 
    activeFilter === "All" || req.status === activeFilter
  );

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Service Requests</h1>
        <p className="text-gray-500">Track and manage all your service requests here.</p>
      </motion.div>

      {/* Filters */}
      <div className="my-6 flex flex-wrap gap-2">
        {["All", "PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeFilter === filter 
                ? "bg-primary text-white shadow" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {filter === "IN_PROGRESS" ? "In Progress" : filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {filteredRequests.length > 0 ? filteredRequests.map((req, index) => {
            const { icon: Icon, color, label } = statusConfig[req.status as keyof typeof statusConfig];
            return (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/dashboard/requests/${req.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {label}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{req.service}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{req.worker}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(req.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col justify-between items-end">
                      <p className="font-bold text-lg text-gray-900 mb-2">${req.price}</p>
                      <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          }) : (
            <div className="p-12 text-center text-gray-500">
              <p>No requests found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
