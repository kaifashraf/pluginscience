'use client';

import { motion } from 'framer-motion';
import { UploadCloud, FileText, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = ['Aeromodelling', 'Robotics', 'Data Science', 'Electronics', 'Career Guidance', 'Science', 'Maths', 'Creativity'];

export default function ApplicationForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    currentCompany: '', currentPosition: '', expertise: '',
    yearsExperience: '2-5 years', linkedinUrl: '',
    availability: '1-2 hours / week',
    shortBio: '', motivation: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { alert('File must be under 10MB'); return; }
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const missing: string[] = [];
    if (!form.firstName) missing.push('First Name');
    if (!form.lastName) missing.push('Last Name');
    if (!form.email) missing.push('Email');
    if (!form.phone) missing.push('Phone Number');
    if (!form.currentPosition) missing.push('Current Position');
    if (!form.expertise) missing.push('Area of Expertise');
    if (!form.motivation) missing.push('Motivation');
    if (!cvFile) missing.push('CV / Resume');

    if (missing.length > 0) {
      alert('Please fill in the following required fields:\n• ' + missing.join('\n• '));
      return;
    }
    if (!agreed) { alert('Please agree to the Terms of Service and Privacy Policy.'); return; }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      let cvUrl: string | null = null;

      // Upload CV to Supabase Storage if provided
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `mentor_${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, cvFile);

        if (uploadError) throw new Error('CV upload failed: ' + uploadError.message);

        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        cvUrl = urlData.publicUrl;
      }

      // Insert mentor application into Supabase
      const { error: insertError } = await supabase
        .from('mentor_applications')
        .insert({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          current_company: form.currentCompany || null,
          current_position: form.currentPosition,
          expertise: form.expertise,
          years_experience: form.yearsExperience,
          linkedin_url: form.linkedinUrl || null,
          mentoring_categories: selectedCategories,
          availability: form.availability,
          short_bio: form.shortBio || null,
          motivation: form.motivation,
          cv_url: cvUrl,
        });

      if (insertError) throw new Error('Submission failed: ' + insertError.message);

      // Sync to Google Sheets (fire-and-forget, don't block on failure)
      try {
        await fetch('https://script.google.com/macros/s/AKfycbwE6z3NeoQ3pw5yiGsHRxLvANMYngOLgNxxkqv_KVSVLetmMlGtP7083QuJ7ftfKHpv/exec', {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            token: 'PLUGINSCIENCE_VOLUNTEER2003',
            type: 'mentor',
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone || '',
            currentCompany: form.currentCompany || '',
            currentPosition: form.currentPosition,
            expertise: form.expertise,
            yearsExperience: form.yearsExperience,
            linkedinUrl: form.linkedinUrl || '',
            categories: selectedCategories.join(', '),
            availability: form.availability,
            motivation: form.motivation,
            cvUrl: cvUrl || '',
          }),
        });
      } catch {
        // Sheet sync failure is non-critical, Supabase record is already saved
        console.warn('Google Sheets sync failed (non-critical)');
      }

      setSubmitted(true);
    } catch (error: any) {
      console.error(error);
      alert('Failed to submit: ' + (error?.message || 'Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply-form" className="py-24 bg-gray-50">
        <div className="container-plugin max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[20px] p-12 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-[#0B1121] mb-4">Application Submitted!</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Thank you for applying to become a mentor. We review applications on a rolling basis and will be in touch within 5–7 business days.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent transition-all";
  const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";
  const req = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <section id="apply-form" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[1000px] h-[1000px] bg-[#FF7A00]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container-plugin max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B1121] mb-6 tracking-tight">
            Apply to Become a Mentor
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Fill out the form below to begin your journey. We review applications on a rolling basis.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/80 backdrop-blur-xl rounded-[20px] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100"
        >
          <p className="text-xs text-gray-400 mb-8">Fields marked <span className="text-red-500">*</span> are required.</p>

          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* ── Personal Information ── */}
            <div>
              <h3 className="text-xl font-bold text-[#0B1121] mb-6 pb-2 border-b border-gray-100">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>First Name {req}</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} type="text" className={inputClass} placeholder="Jane" />
                </div>
                <div>
                  <label className={labelClass}>Last Name {req}</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} type="text" className={inputClass} placeholder="Doe" />
                </div>
                <div>
                  <label className={labelClass}>Email Address {req}</label>
                  <input name="email" value={form.email} onChange={handleChange} type="email" className={inputClass} placeholder="jane@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone Number {req}</label>
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel" className={inputClass} placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            {/* ── Professional Background ── */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#0B1121] mb-6 pb-2 border-b border-gray-100">Professional Background</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Current Company <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                  <input name="currentCompany" value={form.currentCompany} onChange={handleChange} type="text" className={inputClass} placeholder="Acme Corp" />
                </div>
                <div>
                  <label className={labelClass}>Current Position {req}</label>
                  <input name="currentPosition" value={form.currentPosition} onChange={handleChange} type="text" className={inputClass} placeholder="Senior Engineer" />
                </div>
                <div>
                  <label className={labelClass}>Area of Expertise {req}</label>
                  <input name="expertise" value={form.expertise} onChange={handleChange} type="text" className={inputClass} placeholder="e.g. Robotics, AI, Drone Engineering" />
                </div>
                <div>
                  <label className={labelClass}>Years of Experience {req}</label>
                  <select name="yearsExperience" value={form.yearsExperience} onChange={handleChange} className={inputClass}>
                    <option>2-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>LinkedIn Profile <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                  <input name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} type="url" className={inputClass} placeholder="https://linkedin.com/in/yourprofile" />
                </div>
              </div>
            </div>

            {/* ── Mentoring Preferences ── */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#0B1121] mb-6 pb-2 border-b border-gray-100">Mentoring Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Preferred Mentoring Categories <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {CATEGORIES.map((cat) => (
                      <button type="button" key={cat} onClick={() => toggleCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-sm transition-all ${
                          selectedCategories.includes(cat)
                            ? 'border-[#FF7A00] bg-[#FF7A00]/10 text-[#FF7A00] font-medium'
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-[#FF7A00] hover:text-[#FF7A00]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Availability {req}</label>
                    <select name="availability" value={form.availability} onChange={handleChange} className={inputClass}>
                      <option>1-2 hours / week</option>
                      <option>3-5 hours / week</option>
                      <option>5+ hours / week</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Short Bio <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                  <textarea name="shortBio" value={form.shortBio} onChange={handleChange} rows={3} className={inputClass + " resize-none"}
                    placeholder="Tell us a little bit about yourself..." />
                </div>
                <div>
                  <label className={labelClass}>Why do you want to become a mentor? {req}</label>
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} rows={4} className={inputClass + " resize-none"}
                    placeholder="What motivates you to mentor others and what impact do you hope to make?" />
                </div>
              </div>
            </div>

            {/* ── CV Upload ── */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#0B1121] mb-2 pb-2 border-b border-gray-100">
                Upload Resume / CV {req}
              </h3>
              <p className="text-xs text-gray-400 mb-5">PDF or DOCX, up to 10MB</p>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  isDragging
                    ? 'border-[#FF7A00] bg-[#FF7A00]/5'
                    : cvFile
                    ? 'border-[#FF7A00]/40 bg-[#FF7A00]/5'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
                />
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                  {cvFile ? <FileText className="w-6 h-6 text-[#FF7A00]" /> : <UploadCloud className="w-6 h-6 text-gray-400" />}
                </div>
                {cvFile ? (
                  <div className="text-center">
                    <p className="text-gray-800 font-medium">{cvFile.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{(cvFile.size / 1024 / 1024).toFixed(2)} MB, Click to change</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOCX up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Agree & Submit ── */}
            <div className="pt-8 border-t border-gray-100 flex flex-col items-center text-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-[#FF7A00] focus:ring-[#FF7A00]"
                />
                <span className="text-gray-600 text-sm">
                  I agree to the <a href="#" className="text-[#FF7A00] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF7A00] hover:underline">Privacy Policy</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-md px-8 py-5 bg-gradient-to-r from-[#FF7A00] to-[#FF9D40] text-white rounded-2xl font-bold text-lg hover:shadow-[0_10px_30px_rgba(255,122,0,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
