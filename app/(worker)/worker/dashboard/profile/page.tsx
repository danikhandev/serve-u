"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { MOCK_WORKERS, MOCK_USERS, SERVICE_CATEGORIES } from "@/constants/mockData";
import { 
  User, Mail, Phone, MapPin, Briefcase, Award, GraduationCap, Image as ImageIcon,
  Edit3, Save, Loader2, PlusCircle, Trash2, Tag, DollarSign, CheckCircle, Upload, X
} from "lucide-react";

export default function WorkerProfilePage() {
  const { user, loading: userLoading, refetch } = useUser();
  const [workerProfile, setWorkerProfile] = useState<any>(null); // This would be fetched
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    bio: '',
    experience: '',
    education: '',
    hourlyRate: 0,
    categories: [] as string[],
    services: [] as any[],
    portfolio: [] as any[],
  });

  useEffect(() => {
    // Simulate fetching worker profile associated with the logged-in user
    if (user && user.isUserSignUpForWorker) {
      const mockWorker = MOCK_WORKERS.find(w => w.userId === user.id);
      if (mockWorker) {
        setWorkerProfile(mockWorker);
        setFormData({
          bio: mockWorker.bio || '',
          experience: mockWorker.experience || '',
          education: mockWorker.education || '',
          hourlyRate: mockWorker.hourlyRate || 0,
          categories: [mockWorker.category] || [], // Simplified for now
          services: mockWorker.services || [],
          portfolio: mockWorker.portfolio || [],
        });
      }
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Simulate API call to update worker profile
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update local mock data (for simulation)
    const updatedWorker = { ...workerProfile, ...formData };
    setWorkerProfile(updatedWorker);

    setSuccess("Profile updated successfully!");
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { id: Date.now().toString(), title: '', price: 0, type: 'FIXED' }]
    }));
  };

  const handleServiceChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newServices = [...prev.services];
      newServices[index] = { ...newServices[index], [field]: value };
      return { ...prev, services: newServices };
    });
  };

  const handleRemoveService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const handleAddPortfolioItem = () => {
    setFormData(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, { id: Date.now().toString(), title: '', image: '' }]
    }));
  };

  const handlePortfolioChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newPortfolio = [...prev.portfolio];
      newPortfolio[index] = { ...newPortfolio[index], [field]: value };
      return { ...prev, portfolio: newPortfolio };
    });
  };

  const handleRemovePortfolioItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(p => p.id !== id)
    }));
  };

  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-lg text-gray-700 ml-3">Loading user...</p>
      </div>
    );
  }

  if (!user.isUserSignUpForWorker) {
    return (
      <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You are not registered as a Worker</h2>
          <p className="text-gray-600 mb-6">
            To manage your worker profile, please complete the onboarding process.
          </p>
          <Link href="/worker/onboarding" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
            Become a Worker
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Worker Profile</h1>
        <p className="text-gray-500">Manage your public profile, services, and portfolio.</p>
      </motion.div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm my-6"
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
            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm my-6"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
            <button onClick={() => setSuccess("")} className="ml-auto"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 disabled:opacity-50">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSave}>
          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={4}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input 
                type="text"
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:bg-gray-50 mb-4"
              />
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input 
                type="text"
                id="education"
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    if (isEditing) {
                      setFormData(prev => ({
                        ...prev,
                        categories: prev.categories.includes(cat)
                          ? prev.categories.filter(c => c !== cat)
                          : [...prev.categories, cat]
                      }));
                    }
                  }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    formData.categories.includes(cat)
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  } ${!isEditing ? "cursor-default" : ""}`}
                  disabled={!isEditing}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Offered */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Services Offered</h3>
            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={service.id} className="flex items-end gap-4 p-4 border border-gray-200 rounded-lg relative">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                    <input 
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="number"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', parseFloat(e.target.value))}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={service.type}
                      onChange={(e) => handleServiceChange(index, 'type', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 appearance-none"
                    >
                      <option value="FIXED">Fixed</option>
                      <option value="HOURLY">Hourly</option>
                      <option value="QUOTATION">Quotation</option>
                    </select>
                  </div>
                  {isEditing && (
                    <button type="button" onClick={() => handleRemoveService(service.id)} className="p-2 text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <button type="button" onClick={handleAddService} className="mt-4 flex items-center gap-2 text-primary hover:underline">
                <PlusCircle className="w-5 h-5" /> Add Service
              </button>
            )}
          </div>

          {/* Portfolio */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.portfolio.map((item, index) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input 
                    type="text"
                    value={item.title}
                    onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 mb-3"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="text"
                    value={item.image}
                    onChange={(e) => handlePortfolioChange(index, 'image', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
                    placeholder="https://example.com/image.jpg"
                  />
                  {isEditing && (
                    <button type="button" onClick={() => handleRemovePortfolioItem(item.id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <button type="button" onClick={handleAddPortfolioItem} className="mt-4 flex items-center gap-2 text-primary hover:underline">
                <PlusCircle className="w-5 h-5" /> Add Portfolio Item
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}