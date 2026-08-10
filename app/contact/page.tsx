'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, School, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-plugin-light min-h-screen pt-32 pb-16">
      <div className="container-fluid relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-theme-drone mb-8 block">Connect</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-display-lg font-display font-bold text-plugin-dark leading-none mb-8"
          >
            Let's Build the <br />
            <span className="text-theme-robotics">Future Together.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-body-lg text-plugin-text-muted max-w-2xl leading-relaxed"
          >
            Whether you're a student eager to explore new opportunities, a school planning impactful workshops, or a professional passionate about mentoring young minds, we'd love to hear from you.
          </motion.p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-plugin-border">
          
          {/* Email */}
          <div className="bg-plugin-surface p-12 group hover:bg-theme-drone transition-colors duration-500">
            <div className="mb-12">
              <Mail className="w-8 h-8 text-plugin-text-muted group-hover:text-plugin-text-inverse transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-plugin-dark group-hover:text-plugin-light mb-4">Email</h3>
            <p className="text-lg font-mono text-theme-drone group-hover:text-plugin-light mb-4">
              kaifashraf07@gmail.com
            </p>
            <p className="text-plugin-text-muted group-hover:text-plugin-text-inverse-muted text-sm leading-relaxed">
              For workshop inquiries, partnerships, mentoring, volunteering, and general support.
            </p>
          </div>

          {/* Phone */}
          <div className="bg-plugin-surface p-12 group hover:bg-theme-robotics transition-colors duration-500">
            <div className="mb-12">
              <Phone className="w-8 h-8 text-plugin-text-muted group-hover:text-plugin-text-inverse transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-plugin-dark group-hover:text-plugin-light mb-4">Phone</h3>
            <p className="text-lg font-mono text-theme-robotics group-hover:text-plugin-light mb-4">
              +91 92636 61030
            </p>
            <p className="text-plugin-text-muted group-hover:text-plugin-text-inverse-muted text-sm leading-relaxed whitespace-pre-line">
              Monday – Saturday
              9:00 AM – 6:00 PM (IST)
            </p>
          </div>

          {/* Partnerships */}
          <div className="bg-plugin-surface p-12 group hover:bg-theme-data transition-colors duration-500">
            <div className="mb-12">
              <School className="w-8 h-8 text-plugin-text-muted group-hover:text-plugin-text-inverse transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-plugin-dark group-hover:text-plugin-text-inverse mb-4">School Partnerships</h3>
            <p className="text-lg font-mono text-theme-data group-hover:text-plugin-text-inverse mb-4">
              Partner with Us
            </p>
            <p className="text-plugin-text-muted group-hover:text-plugin-dark text-sm leading-relaxed">
              Partner with Plug-in to organize engaging technology workshops and learning experiences for your students.
            </p>
          </div>

        </div>

        {/* Global Hub CTA */}
        <div className="mt-32 pt-16 border-t border-plugin-border text-center">
           <h2 className="text-3xl font-display font-bold text-plugin-dark mb-8">Looking to join a workshop?</h2>
           <Link href="/workshops" className="inline-flex items-center gap-4 text-theme-drone font-bold uppercase tracking-widest hover:text-plugin-dark transition-colors">
              Explore Available Programs <ArrowRight className="w-5 h-5" />
           </Link>
        </div>

      </div>
    </div>
  );
}
