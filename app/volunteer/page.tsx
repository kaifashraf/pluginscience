'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const benefits = [
  {
    num: '01',
    title: 'Industry Exposure',
    desc: 'Work alongside aerospace researchers and tech professionals. Gain firsthand insight into how real engineering projects are structured and delivered.',
  },
  {
    num: '02',
    title: 'Verified Certificate',
    desc: 'Receive an official PluginScience Volunteer Certificate, recognised by institutions and valued by employers across engineering and tech fields.',
  },
  {
    num: '03',
    title: 'Expand Your Network',
    desc: 'Connect with mentors, researchers, and fellow volunteers who are serious about building the future. Your next collaborator could be here.',
  },
  {
    num: '04',
    title: 'Build Real Skills',
    desc: 'From event coordination to hands-on workshop assistance — every role sharpens communication, leadership, and technical skills that matter.',
  },
  {
    num: '05',
    title: 'Priority Workshop Access',
    desc: 'Volunteers get first access and discounted or complimentary seats at PluginScience workshops — learn while you contribute.',
  },
  {
    num: '06',
    title: 'Letter of Recommendation',
    desc: 'Top-performing volunteers receive a personalised letter of recommendation from Dr. Md Gulam Sarwar for academic and career applications.',
  },
];

const roles = [
  { label: 'Workshop Assistant', desc: 'Support facilitators during live sessions, guide students, and manage hands-on activity stations.' },
  { label: 'Event Coordinator', desc: 'Help organise and manage PluginScience events, from scheduling and logistics to on-ground coordination.' },
  { label: 'Content & Social', desc: "Capture behind-the-scenes content, manage social media posts, and amplify PluginScience's story online." },
  { label: 'Campus Ambassador', desc: 'Represent PluginScience at your college, spread the word, and help recruit the next generation of builders.' },
];

export default function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    role: '',
    why: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      e.target.value = '';
      return;
    }
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (resume) formData.append('resume', resume);

      const res = await fetch('/api/volunteer', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || errData.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch (error: any) {
      console.error(error);
      alert('Failed to submit: ' + (error?.message || 'Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F3EF] min-h-screen">

      {/* ── HERO ── */}
      <section className="pt-36 pb-24 bg-[#0A0A0A]">
        <div className="container-fluid">
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
            <span className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">Volunteer Programme</span>
            <span className="text-xs font-mono text-white/20 uppercase tracking-[0.2em]">College Students</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <motion.h1
              {...fadeUp}
              className="font-display font-light text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
            >
              Build more than<br />
              a <em className="italic font-medium text-white/40">résumé.</em>
            </motion.h1>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-white/55 font-sans font-light leading-relaxed text-lg mb-8">
                Join PluginScience as a student volunteer. Contribute to real engineering education,
                grow alongside industry experts, and leave with skills, credentials, and
                connections that actually matter.
              </p>
              <a
                href="#apply"
                className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-7 py-4 text-sm font-sans font-medium hover:bg-[#E8E4DC] transition-colors group"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-[#F5F3EF]">
        <div className="container-fluid">
          <div className="flex items-center gap-6 mb-14">
            <span className="text-xs font-mono text-[#aaa] uppercase tracking-[0.25em]">Why Volunteer</span>
            <div className="flex-1 h-[1px] bg-[#0A0A0A]/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A0A0A]/8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F5F3EF] p-10 group hover:bg-white transition-colors duration-300"
              >
                <span className="text-xs font-mono text-[#ccc] block mb-5">{b.num}</span>
                <h3 className="font-display font-medium text-[#0A0A0A] text-xl mb-3 group-hover:text-[#0A0A0A] transition-colors">
                  {b.title}
                </h3>
                <p className="text-[#777] font-sans font-light text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container-fluid">
          <div className="flex items-center gap-6 mb-14">
            <span className="text-xs font-mono text-white/30 uppercase tracking-[0.25em]">Open Roles</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="divide-y divide-white/10">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 group hover:bg-white/[0.02] transition-colors px-1"
              >
                <div className="md:col-span-1 flex items-start pt-1">
                  <span className="text-white/20 text-xs font-mono">0{i + 1}</span>
                </div>
                <div className="md:col-span-4">
                  <h4 className="font-display font-medium text-white text-xl group-hover:text-white transition-colors">
                    {role.label}
                  </h4>
                </div>
                <div className="md:col-span-7 flex items-center">
                  <p className="text-white/45 font-sans font-light text-base leading-relaxed group-hover:text-white/65 transition-colors">
                    {role.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="py-20 bg-[#F5F3EF]">
        <div className="container-fluid">
          <div className="flex items-center gap-6 mb-14">
            <span className="text-xs font-mono text-[#aaa] uppercase tracking-[0.25em]">Apply</span>
            <div className="flex-1 h-[1px] bg-[#0A0A0A]/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left copy */}
            <motion.div {...fadeUp} className="lg:col-span-4">
              <h2
                className="font-display font-light text-[#0A0A0A] leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Ready to be part of something{' '}
                <em className="italic font-medium">bigger?</em>
              </h2>
              <p className="text-[#777] font-sans font-light leading-relaxed text-base mb-8">
                Fill out the form and our team will reach out within 3–5 working days.
                We welcome passionate students from all engineering and science disciplines.
              </p>
              <ul className="space-y-3">
                {['Open to all college years', 'No experience required', 'Remote & on-site roles available'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-sans text-[#555]">
                    <CheckCircle2 className="w-4 h-4 text-[#0A0A0A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              {submitted ? (
                <div className="bg-[#0A0A0A] p-14 text-center">
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-light text-white text-3xl mb-3">Application Received</h3>
                  <p className="text-white/50 font-sans font-light text-base max-w-sm mx-auto">
                    Thank you for applying. Our team will review your application and get back to you within 3–5 working days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] placeholder-[#bbb] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] placeholder-[#bbb] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] placeholder-[#bbb] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">College / University *</label>
                      <input
                        type="text"
                        name="college"
                        required
                        value={form.college}
                        onChange={handleChange}
                        placeholder="Your institution name"
                        className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] placeholder-[#bbb] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Year of Study *</label>
                      <select
                        name="year"
                        required
                        value={form.year}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors appearance-none"
                      >
                        <option value="" disabled>Select year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="postgrad">Post Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Preferred Role *</label>
                      <select
                        name="role"
                        required
                        value={form.role}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors appearance-none"
                      >
                        <option value="" disabled>Select a role</option>
                        <option value="workshop">Workshop Assistant</option>
                        <option value="event">Event Coordinator</option>
                        <option value="content">Content & Social</option>
                        <option value="ambassador">Campus Ambassador</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Why do you want to volunteer? *</label>
                    <textarea
                      name="why"
                      required
                      rows={5}
                      value={form.why}
                      onChange={handleChange}
                      placeholder="Tell us what drives you and what you hope to contribute..."
                      className="w-full bg-white border border-[#0A0A0A]/10 px-5 py-4 text-sm font-sans text-[#0A0A0A] placeholder-[#bbb] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#888] uppercase tracking-[0.2em] block mb-2">Resume / CV <span className="text-[#bbb] normal-case font-sans">(PDF or DOC, max 5MB)</span></label>
                    <label className="flex items-center gap-4 w-full bg-white border border-dashed border-[#0A0A0A]/20 px-5 py-5 cursor-pointer hover:border-[#0A0A0A]/50 transition-colors group">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="w-8 h-8 border border-[#0A0A0A]/20 flex items-center justify-center group-hover:border-[#0A0A0A]/50 transition-colors flex-shrink-0">
                        <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      </div>
                      <span className="text-sm font-sans text-[#888]">
                        {resume ? resume.name : 'Click to upload your resume'}
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-8 py-4 text-sm font-sans font-medium hover:bg-[#222] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
