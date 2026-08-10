'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Pilot',
    email: 'pilot@plugin.dev',
    phone: '+91 9876543210',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClasses = "w-full bg-plugin-bg border border-plugin-cyan/[0.12] rounded-plugin px-4 py-3 text-sm text-plugin-text placeholder:text-plugin-text-secondary/40 focus:outline-none focus:border-plugin-cyan/40 transition-colors font-mono";

  return (
    <div className="space-y-6">
      <div>
        <span className="hud-label text-[10px] mb-2 block">SYSTEMS // PROFILE</span>
        <h1 className="font-display text-section font-bold text-plugin-text tracking-wider">
          PROFILE SETTINGS
        </h1>
        <p className="text-plugin-text-secondary mt-2 text-sm">Manage your account details and shipping address.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar */}
        <div className="plugin-card p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-plugin-cyan/10 border-2 border-plugin-cyan/20 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-plugin-cyan" />
          </div>
          <h3 className="font-display text-lg font-semibold text-plugin-text tracking-wider">{profile.fullName}</h3>
          <p className="text-xs font-mono text-plugin-text-secondary mt-1">{profile.email}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-plugin-success/10 rounded-plugin">
            <span className="w-1.5 h-1.5 bg-plugin-success rounded-full" />
            <span className="text-[10px] font-mono text-plugin-success uppercase tracking-wider">Active Pilot</span>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="plugin-card p-6 space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase text-plugin-text flex items-center gap-2">
              <User className="w-4 h-4 text-plugin-cyan" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">Full Name</label>
                <input type="text" value={profile.fullName} onChange={e => updateField('fullName', e.target.value)} placeholder="Full Name" className={inputClasses} />
              </div>
              <div>
                <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">Email</label>
                <input type="email" value={profile.email} onChange={e => updateField('email', e.target.value)} placeholder="Email" className={inputClasses} disabled />
              </div>
            </div>

            <div>
              <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">Phone</label>
              <input type="tel" value={profile.phone} onChange={e => updateField('phone', e.target.value)} placeholder="Phone" className={inputClasses} />
            </div>
          </div>

          {/* Address */}
          <div className="plugin-card p-6 space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase text-plugin-text flex items-center gap-2">
              <MapPin className="w-4 h-4 text-plugin-cyan" /> Shipping Address
            </h2>

            <div>
              <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">Address</label>
              <input type="text" value={profile.address} onChange={e => updateField('address', e.target.value)} placeholder="Street address" className={inputClasses} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">City</label>
                <input type="text" value={profile.city} onChange={e => updateField('city', e.target.value)} placeholder="City" className={inputClasses} />
              </div>
              <div>
                <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">State</label>
                <input type="text" value={profile.state} onChange={e => updateField('state', e.target.value)} placeholder="State" className={inputClasses} />
              </div>
              <div>
                <label className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs block mb-1.5">Pincode</label>
                <input type="text" value={profile.pincode} onChange={e => updateField('pincode', e.target.value)} placeholder="560001" maxLength={6} className={inputClasses} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="font-display tracking-wider"
              onClick={handleSave}
              isLoading={saving}
            >
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono text-plugin-success"
              >
                ✓ Changes saved
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
