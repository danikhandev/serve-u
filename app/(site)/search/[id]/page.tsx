"use client";

import BookingModal from "@/components/booking/BookingModal";
import { MOCK_WORKERS } from "@/constants/mockData";
import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Star, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award, 
  Briefcase,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WorkerDetailPage() {
  const params = useParams();
  const { user } = useUser();
  const [worker, setWorker] = useState<typeof MOCK_WORKERS[number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching worker data
    const foundWorker = MOCK_WORKERS.find(w => w.id === params.id);
    if (foundWorker) {
      setWorker(foundWorker);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-primary animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Worker Not Found</h2>
          <Link href="/search" className="text-primary hover:underline">Back to Search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link href="/search" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                  <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{worker.name}</h1>
                      <p className="text-lg text-gray-500">{worker.title}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">Verified Pro</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{worker.rating}</span>
                      <span>({worker.jobsCompleted} jobs)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {worker.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      Response time: ~1 hr
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  {worker.bio}
                </p>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Services & Rates</h3>
              <div className="space-y-4">
                {worker.services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{service.title}</h4>
                      <p className="text-sm text-gray-500 capitalize">{service.type.toLowerCase()} Rate</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">${service.price}</div>
                      <button 
                        onClick={() => setIsBookingModalOpen(true)}
                        className="text-xs font-medium text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Portfolio */}
            {worker.portfolio.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Work</h3>
                <div className="grid grid-cols-2 gap-4">
                  {worker.portfolio.map((item) => (
                    <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-video">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white font-medium">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-primary/10"
              >
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">Starting from</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">${worker.hourlyRate}</span>
                    <span className="text-gray-500">/hr</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mb-3"
                >
                  Request Service
                </button>
                
                {user ? (
                  <Link href={`/chat/${worker.userId}`} className="block w-full py-3.5 border-2 border-gray-100 text-gray-700 font-bold text-center rounded-xl hover:border-primary hover:text-primary transition-all">
                    Message
                  </Link>
                ) : (
                  <Link href="/login" className="block w-full py-3.5 border-2 border-gray-100 text-gray-700 font-bold text-center rounded-xl hover:border-primary hover:text-primary transition-all">
                    Login to Message
                  </Link>
                )}

                <div className="mt-6 flex flex-col gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Identity Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-green-500" />
                    <span>{worker.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-green-500" />
                    <span>{worker.jobsCompleted}+ Jobs Completed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        workerName={worker.name}
        services={worker.services}
      />
    </div>
  );
}
