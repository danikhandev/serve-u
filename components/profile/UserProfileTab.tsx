"use client";

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, Loader2, type LucideIcon } from 'lucide-react';

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function UserProfileTab({ user, onSuccess, onError }: { user: UserProfile, onSuccess: (msg: string) => void, onError: (msg: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving data:", formData);
    setIsLoading(false);
    setIsEditing(false);
    onSuccess("Profile updated successfully!");
  };

  const InfoRow = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) => (
    <div className="py-4 border-b border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );

  const InputRow = ({ name, label, value, onChange }: { name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="py-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input 
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
            <Edit3 className="w-4 h-4" /> Edit
          </button>
        ) : (
          <button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 disabled:opacity-50">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isLoading ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputRow name="firstName" label="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            <InputRow name="lastName" label="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          </div>
          <InputRow name="phone" label="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <InputRow name="address" label="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
        </form>
      ) : (
        <div>
          <InfoRow icon={User} label="Full Name" value={`${user.firstName} ${user.lastName}`} />
          <InfoRow icon={Mail} label="Email Address" value={user.email} />
          <InfoRow icon={Phone} label="Phone Number" value={user.phone || "Not provided"} />
          <InfoRow icon={MapPin} label="Address" value={user.address || "Not provided"} />
        </div>
      )}
    </motion.div>
  );
}
