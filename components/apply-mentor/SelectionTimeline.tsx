'use client';

import { motion } from 'framer-motion';
import { Send, FileSearch, Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function SelectionTimeline() {
  const steps = [
    { icon: <Send className="w-5 h-5" />, title: 'Application Submitted' },
    { icon: <FileSearch className="w-5 h-5" />, title: 'Profile Review' },
    { icon: <Users className="w-5 h-5" />, title: 'Interview' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Verification' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Become a Mentor' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-plugin max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#0B1121] mb-6 tracking-tight"
          >
            Selection Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-light max-w-2xl mx-auto"
          >
            Our streamlined approval process gets you mentoring in under a week.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-0.5 bg-gray-100 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-[#FF7A00]"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-row md:flex-col items-center gap-4 md:gap-6 w-full md:w-1/5"
              >
                {/* Mobile vertical line logic */}
                <div className="md:hidden absolute left-[31px] top-0 bottom-0 w-0.5 bg-gray-100 -z-10" />

                <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shrink-0 shadow-sm relative group">
                  {/* Active Border Overlay */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.2), type: 'spring' }}
                    className="absolute inset-[-4px] rounded-full border-4 border-[#FF7A00] opacity-100"
                  />
                  <div className="text-[#0B1121] group-hover:text-[#FF7A00] transition-colors relative z-10">
                    {step.icon}
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0B1121] rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    {idx + 1}
                  </div>
                </div>
                
                <div className="text-left md:text-center">
                  <h4 className="font-bold text-[#0B1121] text-lg mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500 font-light">
                    {idx === 0 && 'Submit your details'}
                    {idx === 1 && 'Our team reviews'}
                    {idx === 2 && 'Video call sync'}
                    {idx === 3 && 'Background check'}
                    {idx === 4 && 'Start earning 🎉'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
