'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Handshake } from 'lucide-react';

export default function BecomeMentorCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Premium Gradient Background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-plugin max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-gray-100"
        >
          <div className="w-20 h-20 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Handshake className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1121] mb-6 tracking-tight leading-[1.1]">
            Share Your Knowledge.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#fb923c]">
              Shape the Future.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're an educator, researcher, engineer, artist, entrepreneur, or industry professional, Plug-in welcomes passionate individuals who want to inspire the next generation through meaningful learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply-mentor">
              <button className="w-full sm:w-auto px-10 py-5 bg-[#F97316] text-white rounded-2xl font-bold hover:bg-[#ea580c] transition-all shadow-lg shadow-[#F97316]/30 flex items-center justify-center gap-2 group text-lg">
                Apply as Mentor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
