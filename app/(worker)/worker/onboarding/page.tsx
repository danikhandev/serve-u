"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User, Briefcase, Tag, Image as ImageIcon, CheckCircle, ArrowRight, ArrowLeft,
  Upload, PlusCircle, Trash2, X, ClipboardCheck, AlertCircle, Loader2
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { SERVICE_CATEGORIES } from "@/constants/mockData"; // Re-using static categories

const STEPS = [
  { id: "personal", name: "Personal Details", icon: User },
  { id: "professional", name: "Professional Info", icon: Briefcase },
  { id: "services", name: "Services & Rates", icon: Tag },
  { id: "portfolio", name: "Portfolio", icon: ImageIcon },
  { id: "verification", name: "ID Verification", icon: ClipboardCheck },
];

export default function WorkerOnboardingPage() {
  const router = useRouter();
  const { user, refetch } = useUser(); // To update user state after onboarding
  const [currentStep, setCurrentStep] = useState(STEPS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    address: '',
    bio: '',
    experience: '',
    education: '',
    hourlyRate: 0,
    selectedCategories: [] as string[],
    servicesOffered: [] as { id: string; title: string; price: number; type: string }[],
    portfolioItems: [] as { id: string; title: string; imageUrl: string }[],
    idCardFile: null as File | null,
    idCardPreview: '' as string,
  });

  const handleNext = () => {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
      setError(""); // Clear error on step change
    }
  };

  const handlePrev = () => {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
      setError(""); // Clear error on step change
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, idCardFile: file, idCardPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({ ...prev, idCardFile: null, idCardPreview: '' }));
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: [...prev.servicesOffered, { id: Date.now().toString(), title: '', price: 0, type: 'FIXED' }]
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => {
      const newServices = [...prev.servicesOffered];
      newServices[index] = { ...newServices[index], [field]: value };
      return { ...prev, servicesOffered: newServices };
    });
  };

  const handleRemoveService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.filter(s => s.id !== id)
    }));
  };

  const handleAddPortfolioItem = () => {
    setFormData(prev => ({
      ...prev,
      portfolioItems: [...prev.portfolioItems, { id: Date.now().toString(), title: '', imageUrl: '' }]
    }));
  };

  const handlePortfolioChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newPortfolio = [...prev.portfolioItems];
      newPortfolio[index] = { ...newPortfolio[index], [field]: value };
      return { ...prev, portfolioItems: newPortfolio };
    });
  };

  const handleRemovePortfolioItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.filter(p => p.id !== id)
    }));
  };

  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    // Simulate API call to register worker and update user profile
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you'd send formData to your backend
    console.log("Submitting worker onboarding data:", formData);

    // Mock successful update of user role
    // This part requires interaction with the UserContext (not implemented in mock login currently)
    // For now, we'll just redirect
    
    setSuccess("Onboarding complete! Redirecting to your dashboard...");
    await refetch(); // Simulate refetching user to get updated worker status

    setTimeout(() => {
      router.push("/worker/dashboard");
    }, 2500);

    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
          </motion.div>
        );
      case "professional":
        return (
          <motion.div
            key="professional"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio/Description</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education/Certifications</label>
              <input type="text" value={formData.education} onChange={(e) => setFormData({...formData, education: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Hourly Rate ($)</label>
              <input type="number" value={formData.hourlyRate || ''} onChange={(e) => setFormData({...formData, hourlyRate: parseFloat(e.target.value)})} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
          </motion.div>
        );
      case "services":
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Select Categories (up to 3)</h3>
              <div className="flex flex-wrap gap-2">
                {SERVICE_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        selectedCategories: prev.selectedCategories.includes(cat)
                          ? prev.selectedCategories.filter(c => c !== cat)
                          : prev.selectedCategories.length < 3 
                            ? [...prev.selectedCategories, cat]
                            : prev.selectedCategories
                      }));
                    }}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      formData.selectedCategories.includes(cat)
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">Specific Services Offered</h3>
              {formData.servicesOffered.map((service, index) => (
                <div key={service.id} className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" value={service.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input type="number" value={service.price || ''} onChange={(e) => handleServiceChange(index, 'price', parseFloat(e.target.value))} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select value={service.type} onChange={(e) => handleServiceChange(index, 'type', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                      <option value="FIXED">Fixed</option>
                      <option value="HOURLY">Hourly</option>
                      <option value="QUOTATION">Quote</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => handleRemoveService(service.id)} className="p-2 text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddService} className="flex items-center gap-2 text-primary hover:underline">
                <PlusCircle className="w-5 h-5" /> Add Service
              </button>
            </div>
          </motion.div>
        );
      case "portfolio":
        return (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">Showcase Your Work</h3>
              {formData.portfolioItems.map((item, index) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-end mb-2">
                    <button type="button" onClick={() => handleRemovePortfolioItem(item.id)} className="p-1 text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <input type="text" value={item.title} onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="text" value={item.imageUrl} onChange={(e) => handlePortfolioChange(index, 'imageUrl', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="https://example.com/project-image.jpg" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddPortfolioItem} className="flex items-center gap-2 text-primary hover:underline">
                <PlusCircle className="w-5 h-5" /> Add Portfolio Item
              </button>
            </div>
          </motion.div>
        );
      case "verification":
        return (
          <motion.div
            key="verification"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-medium text-gray-900 mb-2">ID Verification</h3>
              <p className="text-gray-600 mb-4">Upload a clear photo of your government-issued ID (e.g., Driver&apos;s License, Passport).</p>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                {formData.idCardPreview ? (
                  <div className="flex flex-col items-center">
                    <img src={formData.idCardPreview} alt="ID Card Preview" className="max-h-48 rounded-lg mb-2" />
                    <p className="text-sm text-gray-700">{formData.idCardFile?.name}</p>
                    <button type="button" onClick={handleRemoveFile} className="mt-2 text-red-500 hover:text-red-700 text-sm">Remove</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-lg font-medium text-gray-700">Drag & drop or click to upload</p>
                    <p className="text-sm text-gray-500">Max file size: 5MB (JPG, PNG)</p>
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-secondary p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Become a Serve-U Pro</h1>
            <p className="text-white/90 text-sm">Tell us about yourself to get started earning!</p>
          </div>

          <div className="p-8">
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8">
              {STEPS.map((stepItem, index) => (
                <div key={stepItem.id} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    STEPS.findIndex(s => s.id === currentStep) >= index ? 'bg-primary' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <p className={`text-xs mt-2 text-center ${
                    STEPS.findIndex(s => s.id === currentStep) >= index ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {stepItem.name}
                  </p>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-6"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                  <button onClick={() => setError("")} className="ml-auto"><X className="w-4 h-4" /></button>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm mb-6"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{success}</span>
                  <button onClick={() => setSuccess("")} className="ml-auto"><X className="w-4 h-4" /></button>
                </motion.div>
              )}
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {STEPS.findIndex(step => step.id === currentStep) > 0 && (
                <button type="button" onClick={handlePrev} className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <ArrowLeft className="w-5 h-5" /> Previous
                </button>
              )}
              {STEPS.findIndex(step => step.id === currentStep) < STEPS.length - 1 ? (
                <button type="button" onClick={handleNext} className="ml-auto px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2">
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmitAll} disabled={isSubmitting} className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  {isSubmitting ? "Finishing..." : "Complete Onboarding"}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
