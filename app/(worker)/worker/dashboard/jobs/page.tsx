"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, Search, Calendar, User, DollarSign } from "lucide-react";
import Link from "next/link";

// Mock data for job requests specific to a worker
const mockWorkerJobs = [
  {
    id: "job-1",
    service: "Kitchen Sink Repair",
    consumer: "Alex Consumer",
    status: "PENDING", // Worker needs to accept/reject
    date: "2026-01-15T17:00:00Z",
    price: 150,
  },
  {
    id: "job-2",
    service: "Ceiling Fan Installation",
    consumer: "Jane Doe",
    status: "ACCEPTED",
    date: "2026-01-16T11:00:00Z",
    price: 120,
  },
  {
    id: "job-3",
    service: "Backyard Cleanup",
    consumer: "Mark Johnson",
    status: "IN_PROGRESS",
    date: "2026-01-14T09:00:00Z",
    price: 180,
  },
  {
    id: "job-4",
    service: "Deep House Cleaning",
    consumer: "Emily White",
    status: "COMPLETED",
    date: "2026-01-10T14:30:00Z",
    price: 250,
  },
  {
    id: "job-5",
    service: "Custom Desk Build",
    consumer: "David Green",
    status: "CANCELLED",
    date: "2026-01-08T16:00:00Z",
    price: 400,
  },
];

const statusConfig = {
  PENDING: { icon: Clock, color: "text-yellow-600 bg-yellow-50 border-yellow-100", label: "New Request" },
  ACCEPTED: { icon: CheckCircle, color: "text-blue-600 bg-blue-50 border-blue-100", label: "Accepted" },
  IN_PROGRESS: { icon: Clock, color: "text-purple-600 bg-purple-50 border-purple-100", label: "In Progress" },
  COMPLETED: { icon: CheckCircle, color: "text-green-600 bg-green-50 border-green-100", label: "Completed" },
  CANCELLED: { icon: XCircle, color: "text-red-600 bg-red-50 border-red-100", label: "Cancelled" },
};

export default function WorkerJobsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredJobs = mockWorkerJobs.filter(job => 
    activeFilter === "All" || job.status === activeFilter
  );

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
        <p className="text-gray-500">View and manage all your assigned and requested jobs.</p>
      </motion.div>

      {/* Filters */}
      <div className="my-6 flex flex-wrap gap-2">
        {["All", "PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeFilter === filter 
                ? "bg-primary text-white shadow" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {filter.replace("_", " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {filteredJobs.length > 0 ? filteredJobs.map((job, index) => {
            const { icon: Icon, color, label } = statusConfig[job.status as keyof typeof statusConfig];
            return (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/worker/jobs/${job.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {label}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{job.service}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{job.consumer}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(job.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col justify-between items-end">
                      <p className="font-bold text-lg text-gray-900 mb-2">${job.price}</p>
                      <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          }) : (
            <div className="p-12 text-center text-gray-500">
              <p>No jobs found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
