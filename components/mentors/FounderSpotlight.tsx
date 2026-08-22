'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, GraduationCap } from 'lucide-react';

export default function FounderSpotlight() {
  const tags = [
    "Aerospace Engineering",
    "Aerodynamics",
    "Rocketry",
    "Drone Technology",
    "STEM Education",
    "Computational Fluid Dynamics"
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/gulam_sarwar.jpeg`}
                alt="Dr. Md Gulam Sarwar"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121]/50 to-transparent" />
            </div>

            {/* Badges */}
            <div className="absolute bottom-10 -right-4 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-[#F97316]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                <p className="font-bold text-[#0B1121]">Founder</p>
              </div>
            </div>
            
            <div className="absolute top-10 -left-4 lg:-left-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#0B1121]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Institution</p>
                <p className="font-bold text-[#0B1121]">IIT Kanpur</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm font-bold text-[#0B1121] tracking-widest uppercase">Domain Expert and Advisor</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1121] mb-2 tracking-tight">
              Dr. Md. Gulam Sarwar
            </h2>
            <p className="text-xl text-[#F97316] font-semibold mb-2">
              Founder
            </p>
            <p className="text-gray-500 font-medium mb-8">
              Postdoctoral Fellow, IIT Kanpur
            </p>

            <h3 className="text-xl font-bold text-[#0B1121] mb-4">About</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
              Dr. Md. Gulam Sarwar is an aerospace researcher and educator dedicated to making STEM education practical, accessible, and inspiring for school students. Through PluginScience, he aims to bridge the gap between classroom learning and real-world innovation by creating hands-on workshops that encourage creativity, critical thinking, and problem-solving.
            </p>

            <h3 className="text-xl font-bold text-[#0B1121] mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>


          </motion.div>
        </div>

      </div>
    </section>
  );
}
