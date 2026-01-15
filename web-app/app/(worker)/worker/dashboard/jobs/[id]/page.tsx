"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  DollarSign, 
  Briefcase, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Paperclip,
  Award
} from "lucide-react";
import Link from "next/link";

// Mock data for worker job requests (expanded with more details)
const mockWorkerJobs = [
  {
    id: "job-1",
    service: "Kitchen Sink Repair",
    consumer: "Alex Consumer",
    consumerId: "user-1",
    status: "PENDING", // Worker needs to accept/reject
    date: "2026-01-15T17:00:00Z",
    quotedPrice: 150,
    description: "The kitchen sink is leaking heavily, needs immediate repair. Water is dripping from the pipes under the sink. Photos attached.",
    attachments: [
      { id: "att1", fileName: "sink-leak.jpg", fileUrl: "https://images.unsplash.com/photo-1582234033006-2591605cf525?q=80&w=400&auto=format&fit=crop", fileType: "image/jpeg" },
      { id: "att2", fileName: "under-sink.jpg", fileUrl: "https://images.unsplash.com/photo-1602534575971-158b09ff25d1?q=80&w=400&auto=format&fit=crop", fileType: "image/jpeg" }
    ],
    location: "123 Main St, Sydney NSW",
    timeline: [
      { status: "PENDING", date: "2026-01-15T16:45:00Z", note: "Request received from Alex Consumer." },
    ]
  },
  {
    id: "job-2",
    service: "Ceiling Fan Installation",
    consumer: "Jane Doe",
    consumerId: "user-6", // Dummy consumer ID
    status: "ACCEPTED",
    date: "2026-01-16T11:00:00Z",
    quotedPrice: 120,
    description: "New ceiling fan needs to be installed in the living room. Existing wiring is there.",
    attachments: [],
    location: "789 Oak Ave, Sydney NSW",
    timeline: [
      { status: "PENDING", date: "2026-01-15T09:00:00Z", note: "Request received from Jane Doe." },
      { status: "ACCEPTED", date: "2026-01-15T09:30:00Z", note: "Job accepted." },
    ]
  },
];

const statusConfig = {
  PENDING: { label: "New Request", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  ACCEPTED: { label: "Accepted", color: "bg-blue-100 text-blue-700 border-blue-200" },
  IN_PROGRESS: { label: "In Progress", color: "bg-purple-100 text-purple-700 border-purple-200" },
  COMPLETED: { label: "Completed", color: "bg-green-100 text-green-700 border-green-200" },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-700 border-red-200" },
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  useEffect(() => {
    const foundJob = mockWorkerJobs.find(j => j.id === params.id);
    if (foundJob) {
      setJob(foundJob);
      setCurrentStatus(foundJob.status);
    }
    setLoading(false);
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStatus(newStatus);
    // In a real app, you would update the backend here
    // And possibly update the local mock data
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-primary animate-pulse">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <Link href="/worker/jobs" className="text-primary hover:underline">Back to My Jobs</Link>
        </div>
      </div>
    );
  }

  const { label: statusLabel, color: statusColor } = statusConfig[currentStatus as keyof typeof statusConfig];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <Link href="/worker/dashboard/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to My Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.service}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span className={`font-semibold text-xs px-2 py-1 rounded-full border ${statusColor}`}>{statusLabel}</span>
              <span>•</span>
              <span>{new Date(job.date).toLocaleString()}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed mb-8">{job.description}</p>

          {job.attachments.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Attachments</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {job.attachments.map((att: any) => (
                  <a key={att.id} href={att.fileUrl} target="_blank" rel="noopener noreferrer" className="block relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img src={att.fileUrl} alt={att.fileName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Paperclip className="w-6 h-6 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Timeline</h3>
          <div className="space-y-6">
            {job.timeline.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full mt-1 ${statusConfig[item.status as keyof typeof statusConfig].color.replace('text-', 'bg-')}`}></div>
                  {index < job.timeline.length - 1 && 
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 h-full w-0.5 bg-gray-200"></div>
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{statusConfig[item.status as keyof typeof statusConfig].label}</p>
                  <p className="text-sm text-gray-500">{item.note}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-bold text-lg mb-4">Job Actions</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Quoted Price:</span>
              <span className="font-bold text-2xl text-gray-900">${job.quotedPrice}</span>
            </div>

            {currentStatus === "PENDING" && (
              <div className="flex gap-3 mb-4">
                <button onClick={() => handleStatusUpdate("ACCEPTED")} disabled={loading} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50">
                  {loading ? 'Accepting...' : 'Accept Job'}
                </button>
                <button onClick={() => handleStatusUpdate("CANCELLED")} disabled={loading} className="flex-1 py-3 border border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50">
                  Reject
                </button>
              </div>
            )}

            {(currentStatus === "ACCEPTED" || currentStatus === "IN_PROGRESS") && (
              <button onClick={() => handleStatusUpdate("COMPLETED")} disabled={loading} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 mb-3">
                {loading ? 'Marking...' : 'Mark as Completed'}
              </button>
            )}

            <Link href={`/chat/${job.consumerId}`} className="block w-full py-3 border-2 border-gray-100 text-gray-700 font-bold text-center rounded-xl hover:border-primary hover:text-primary transition-colors">
              Message Consumer
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-bold text-lg mb-4">Consumer Info</h3>
            <div className="flex items-center gap-4">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt={job.consumer} className="w-12 h-12 rounded-full"/>
              <div>
                <p className="font-semibold text-gray-900">{job.consumer}</p>
                <p className="text-sm text-gray-500">ID: {job.consumerId}</p>
              </div>
            </div>
            <button className="w-full py-2.5 mt-4 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              View Consumer Profile
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
