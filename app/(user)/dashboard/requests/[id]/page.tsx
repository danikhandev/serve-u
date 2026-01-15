"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Star
} from "lucide-react";
import Link from "next/link";
// This would be a real fetch in a real app
const mockRequests = [
  {
    id: "req-1",
    service: "Emergency Leak Repair",
    worker: "Sarah Smith",
    status: "IN_PROGRESS",
    date: "2026-01-15T14:00:00Z",
    price: 150,
    description: "There is a major leak under the kitchen sink. The cabinet is already flooded. Need urgent assistance.",
    timeline: [
      { status: "PENDING", date: "2026-01-15T13:30:00Z", note: "Request sent to worker." },
      { status: "ACCEPTED", date: "2026-01-15T13:35:00Z", note: "Sarah accepted the job." },
      { status: "IN_PROGRESS", date: "2026-01-15T13:55:00Z", note: "Sarah is on her way." }
    ]
  },
  // Add other mock requests if needed for direct navigation testing
];

interface TimelineItem {
  status: string;
  date: string;
  note: string;
}

interface ServiceRequest {
  id: string;
  service: string;
  worker: string;
  status: string;
  date: string;
  price: number;
  description: string;
  timeline: TimelineItem[];
}

export default function RequestDetailPage() {
  const params = useParams();
  const [request, setRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    const foundRequest = mockRequests.find(r => r.id === params.id);
    setRequest(foundRequest || null);
  }, [params.id]);

  if (!request) {
    return (
      <div className="flex-1 bg-gray-50 p-6 text-center">
        <p>Loading request details...</p>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "IN_PROGRESS": return { label: "In Progress", color: "text-blue-600" };
      case "PENDING": return { label: "Pending", color: "text-yellow-600" };
      case "COMPLETED": return { label: "Completed", color: "text-green-600" };
      case "CANCELLED": return { label: "Cancelled", color: "text-red-600" };
      default: return { label: status, color: "text-gray-600" };
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <Link href="/dashboard/requests" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to All Requests
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{request.service}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span className={`font-semibold ${getStatusInfo(request.status).color}`}>{getStatusInfo(request.status).label}</span>
              <span>•</span>
              <span>{new Date(request.date).toLocaleString()}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-4">Job Details</h3>
          <p className="text-gray-600 leading-relaxed mb-8">{request.description}</p>
          
          <h3 className="text-lg font-bold text-gray-800 mb-4">Timeline</h3>
          <div className="space-y-6">
            {request.timeline.map((item: TimelineItem, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full mt-1 ${getStatusInfo(item.status).color.replace('text-', 'bg-')}`}></div>
                  {index < request.timeline.length - 1 && 
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 h-full w-0.5 bg-gray-200"></div>
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{getStatusInfo(item.status).label}</p>
                  <p className="text-sm text-gray-500">{item.note}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-bold text-lg mb-4">Worker Details</h3>
            <div className="flex items-center gap-4 mb-6">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt={request.worker} className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold text-gray-900">{request.worker}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9
                </div>
              </div>
            </div>
            <button className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              View Profile
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-bold text-lg mb-4">Payment</h3>
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-gray-500">Amount</span>
              <span className="font-bold text-2xl text-gray-900">${request.price}</span>
            </div>
            <button className="w-full py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300" disabled={request.status !== "COMPLETED"}>
              Pay Now
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">Payment enabled upon job completion.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
