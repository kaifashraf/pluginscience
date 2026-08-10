'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default function MentorRequirements() {
  const requirements = [
    'Professionals with 2+ years experience OR passionate student volunteers',
    'Excellent communication and interpersonal skills',
    'Genuine passion for teaching and mentoring',
    'Strong technical or professional expertise',
    'Portfolio website or active LinkedIn profile preferred',
    'Reliable high-speed internet connection for video calls'
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0B1121] mb-6 tracking-tight">
              What it takes to be a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9D40]">Great Mentor</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed max-w-lg">
              We maintain high standards to ensure our students receive the best guidance possible. Here is what we look for in our mentor applications.
            </p>
            
            <ul className="space-y-6">
              {requirements.map((req, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF7A00]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#FF7A00] stroke-[3]" />
                  </div>
                  <span className="text-gray-700 font-medium text-[1.05rem]">{req}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop"
              alt="Mentor requirements and standards"
              fill
              className="object-cover"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
