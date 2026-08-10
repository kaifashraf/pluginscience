'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2, GraduationCap } from 'lucide-react';

export default function FeaturedMentor() {
  const tags1 = [
    "Aerospace Engineering",
    "Supersonic Flow",
    "Aerodynamics",
    "Computational Fluid Dynamics",
    "High-Speed Flow Visualization"
  ];

  const tags2 = [
    "Aerospace Engineering",
    "Supersonic Jets",
    "Acoustic Studies",
    "Shock Cells",
    "Fluid Dynamics"
  ];

  return (
    <section className="py-24 bg-gray-50/50 relative">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        
        {/* First Featured Mentor */}
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center mb-32">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6">
              <span className="text-sm font-bold text-[#F97316] tracking-widest uppercase">Featured Mentor</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1121] mb-2 tracking-tight">
              Dr. Devabrata Sahoo
            </h2>
            <p className="text-xl text-[#F97316] font-semibold mb-2">
              Assistant Professor II
            </p>
            <p className="text-gray-500 font-medium mb-8">
              KIIT University (Ph.D. from Technion, Israel)
            </p>

            <h3 className="text-xl font-bold text-[#0B1121] mb-4">About</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
              Dr. Devabrata Sahoo brings over 15 years of research experience specializing in experimental and computational aerodynamics, particularly in supersonic flow. With degrees in Mechanical and Space Engineering, his expertise covers high-speed flow visualization, force measurements, and advanced computational tools. He is also a co-editor of the book <em className="italic font-medium text-[#0B1121]">"Advances in Aerospace Technologies"</em>, making him an invaluable mentor for aerospace innovators.
            </p>

            <h3 className="text-xl font-bold text-[#0B1121] mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {tags1.map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>


          </motion.div>

          {/* Right Side: Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-200">
              <Image 
                src="https://faculty.kiit.ac.in/wp-content/uploads/2025/11/Aerospace_Devabrata.jpg"
                alt="Dr. Devabrata Sahoo"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121]/40 to-transparent" />
            </div>

            {/* Badges */}
            <div className="absolute bottom-10 -left-4 lg:-left-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Focus</p>
                <p className="font-bold text-[#0B1121]">Aerospace & Aerodynamics</p>
              </div>
            </div>
            
            <div className="absolute top-10 -right-4 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Institution</p>
                <p className="font-bold text-[#0B1121]">KIIT University</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Second Featured Mentor */}
        <div className="flex flex-col-reverse lg:flex-row-reverse gap-16 items-center">
          
          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Domain Expert and Advisor</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1121] mb-2 tracking-tight">
              Dr. Lavala Srinivasa Rao
            </h2>
            <p className="text-xl text-blue-600 font-semibold mb-2">
              Aerospace Researcher & Academic
            </p>
            <p className="text-gray-500 font-medium mb-8">
              IIT Kanpur / BIT Mesra
            </p>

            <h3 className="text-xl font-bold text-[#0B1121] mb-4">About</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
              Dr. Lavala Srinivasa Rao is a distinguished researcher in aerospace engineering, specializing in flow field and acoustic studies of supersonic jets. His work on imperfectly expanded supersonic jets and shock cells has been widely published in leading journals such as the Journal of Aerospace Engineering (ASCE). He brings deep expertise in complex fluid dynamics to the next generation of engineers.
            </p>

            <h3 className="text-xl font-bold text-[#0B1121] mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {tags2.map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

          </motion.div>

          {/* Left Side: Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-200">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                 {/* Placeholder since we don't have his photo */}
                 <span className="text-gray-500 font-medium text-xl">Dr. Srinivasa Rao</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121]/20 to-transparent" />
            </div>

            {/* Badges */}
            <div className="absolute bottom-10 -right-4 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3 z-10">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Focus</p>
                <p className="font-bold text-[#0B1121]">Fluid Dynamics</p>
              </div>
            </div>
            
            <div className="absolute top-10 -left-4 lg:-left-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3 z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Institution</p>
                <p className="font-bold text-[#0B1121]">IIT Kanpur / BIT Mesra</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
