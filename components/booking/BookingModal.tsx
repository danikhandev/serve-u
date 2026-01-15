"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, DollarSign, Paperclip, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns"; // Assuming date-fns is not installed, I'll use native Date
// If date-fns is not available, I will use native JS Date formatting

interface Service {
  id: string;
  title: string;
  price: number;
  type: "FIXED" | "HOURLY" | "QUOTATION";
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  services: Service[];
  hourlyRate: number;
}

export default function BookingModal({ isOpen, onClose, workerName, services, hourlyRate }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | "custom">("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep(3); // Success step
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {step === 3 ? "Request Sent!" : `Book ${workerName}`}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {step === 1 && (
              <form onSubmit={() => setStep(2)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Service</label>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div 
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedService === service.id 
                            ? "border-primary bg-primary/5" 
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{service.title}</span>
                          <span className="text-sm font-bold text-gray-700">
                            ${service.price} {service.type === "HOURLY" ? "/hr" : ""}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <div 
                      onClick={() => setSelectedService("custom")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedService === "custom" 
                          ? "border-primary bg-primary/5" 
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <span className="font-medium text-gray-900">Custom Request</span>
                      <p className="text-xs text-gray-500 mt-1">Describe a specific task not listed above</p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!selectedService}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Details
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe what you need done..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Price Offer (Optional)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="number"
                        placeholder={selectedService !== "custom" ? "Standard Rate" : "Offer amount"}
                        value={priceOffer}
                        onChange={(e) => setPriceOffer(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload photos or documents</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent Successfully!</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                  {workerName} has received your request. You can track the status in your dashboard.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
