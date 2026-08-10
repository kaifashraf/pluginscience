'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ApplyMentorCTA() {
  return (
    <section className="py-32 bg-[#0B1121] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF7A00]/20 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

      <div className="container-plugin max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
            Ready to Inspire <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9D40]">Thousands?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join our community of passionate mentors and start making an impact today. Your expertise is the catalyst for someone else's success.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#apply-form">
              <button className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#FF7A00] to-[#FF9D40] text-white rounded-2xl font-bold hover:shadow-[0_10px_30px_rgba(255,122,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group text-lg">
                Apply as Mentor
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
