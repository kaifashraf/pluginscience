'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import Button from './ui/Button';

export default function HeroEducation() {
  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-plugin-bg">
      <div className="container-plugin relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] space-y-8"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] leading-[1.15] font-bold tracking-wide text-plugin-text">
              Plug-in empowers schools and educators with practical Robotics, AI, Electronics, Coding, and Aeromodelling programs designed to build future-ready skills through hands-on learning.
            </h1>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button className="bg-plugin-cyan hover:bg-plugin-cyan-bright text-white font-bold px-8 py-6 rounded-2xl tracking-wide shadow-lg shadow-plugin-cyan/20 w-full sm:w-auto text-lg transition-transform hover:-translate-y-1">
                🚀 Programs for Schools
              </Button>
              <Button variant="ghost" className="bg-white border-2 border-plugin-surface text-plugin-text hover:border-plugin-cyan font-bold px-8 py-6 rounded-2xl tracking-wide w-full sm:w-auto text-lg transition-transform hover:-translate-y-1">
                👩‍🏫 Become an Educator
              </Button>
            </div>
          </motion.div>

          {/* Right Image/Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[50%] relative"
          >
            {/* The Main Image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-plugin-surface aspect-[4/3] border-[6px] border-white">
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#FFD0AD_2px,transparent_2px)] bg-[size:24px_24px] opacity-20" />
              
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="Student working on electronics" 
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 sm:-left-12 bg-white rounded-2xl p-4 sm:p-6 shadow-xl flex items-center gap-4 z-20 border border-black/5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E6FAFA] flex items-center justify-center">
                <Zap className="w-6 h-6 text-plugin-cyan fill-plugin-cyan" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-plugin-text tracking-tight">35,000+</div>
                <div className="text-[10px] sm:text-xs font-bold text-plugin-text-secondary tracking-widest uppercase">STUDENTS TRAINED</div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 -right-1/4 w-1/2 aspect-square bg-plugin-cyan/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
