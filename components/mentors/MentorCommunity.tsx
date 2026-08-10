'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, Code2, FlaskConical, Rocket, BrainCircuit, Palette, Mic, Camera, Calculator, Briefcase, X, GraduationCap, Building2 } from 'lucide-react';

const categories = [
  { id: 'All', icon: null, color: 'bg-gray-100 text-gray-700' },
  { id: 'Robotics', icon: <Bot className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
  { id: 'Coding', icon: <Code2 className="w-4 h-4" />, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'Science', icon: <FlaskConical className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
  { id: 'Aerodynamics', icon: <Rocket className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700' },
  { id: 'Artificial Intelligence', icon: <BrainCircuit className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700' },
  { id: 'Creative Arts', icon: <Palette className="w-4 h-4" />, color: 'bg-pink-100 text-pink-700' },
  { id: 'Public Speaking', icon: <Mic className="w-4 h-4" />, color: 'bg-red-100 text-red-700' },
  { id: 'Photography', icon: <Camera className="w-4 h-4" />, color: 'bg-teal-100 text-teal-700' },
  { id: 'Mathematics', icon: <Calculator className="w-4 h-4" />, color: 'bg-cyan-100 text-cyan-700' },
  { id: 'Entrepreneurship', icon: <Briefcase className="w-4 h-4" />, color: 'bg-amber-100 text-amber-700' },
];

const mentorsData = [


  {
    id: 7,
    name: "Syed Kaif Ashraf",
    designation: "AI & Data Science Mentor",
    institution: "Vellore Institute of Technology",
    expertise: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    bio: "Passionate about making technology accessible, Syed focuses on Artificial Intelligence, Deep Learning, and Data Science. As a B.Tech CSE AIML graduate from VIT, he participated in the prestigious Digital India RISC-V (DIR-V) Grand Challenge. He helps students build real, high-impact projects.",
    image: "/Kaif.jpeg"
  },
  {
    id: 8,
    name: "Dr. Saista Tabassum",
    designation: "Assistant Professor of Mathematics",
    institution: "Dr. Rajendra Prasad Central Agricultural University",
    expertise: ["Mathematics"],
    bio: "With a Ph.D. in Mathematics from IIT (ISM) Dhanbad and postdoctoral research experience at IIT Bombay, Dr. Tabassum specializes in Applied Mathematics, fluid dynamics, mathematical modeling, and ocean engineering. She brings deep analytical expertise and academic rigor to her mentorship.",
    image: "https://rpcau.ac.in/wp-content/uploads/2025/08/Dr-Saista-Tabssum-150x150.png"
  },
  {
    id: 9,
    name: "Nekhat Shahreen",
    designation: "Pharmacology Researcher",
    institution: "Jamia Hamdard University",
    expertise: ["Science", "Pharmacology", "Immunology", "Nanoengineering"],
    bio: "Nekhat Shahreen is a distinguished pharmacology researcher holding both B.Pharm and M.Pharm degrees from Jamia Hamdard University. Her pioneering research explores advanced nanoengineered drug delivery systems to modulate T-cell responses in cancer immunotherapy, with her latest breakthroughs featured in the prestigious journal Frontiers in Pharmacology.",
    image: "/nekhat_cropped.jpg"
  }
];

export default function MentorCommunity() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentorsData)[0] | null>(null);

  const filteredMentors = activeCategory === 'All' 
    ? mentorsData 
    : mentorsData.filter(mentor => mentor.expertise.includes(activeCategory));

  return (
    <section className="py-24 bg-white relative">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1121] mb-6 tracking-tight">
            Meet Our Mentor Community
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Browse our diverse network of passionate educators and industry professionals ready to guide your journey.
          </p>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => setActiveCategory(cat.id)}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat.id 
                  ? `${cat.color} ring-2 ring-offset-2 ring-gray-200 border-transparent shadow-md scale-105` 
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {cat.icon}
              {cat.id}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image 
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1121]">{mentor.name}</h3>
                    <p className="text-sm font-semibold text-[#F97316] mb-1">{mentor.designation}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{mentor.institution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map(exp => {
                    const catData = categories.find(c => c.id === exp);
                    return (
                      <span key={exp} className={`text-xs px-2.5 py-1 rounded-md font-semibold ${catData?.color || 'bg-gray-100 text-gray-600'}`}>
                        {exp}
                      </span>
                    );
                  })}
                </div>

                <p className="text-gray-600 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                  {mentor.bio}
                </p>

                <button 
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full py-3 bg-gray-50 text-[#0B1121] rounded-xl font-semibold hover:bg-[#0B1121] hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredMentors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No mentors found for this category yet.</p>
          </div>
        )}

      </div>

      {/* Mentor Profile Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-0 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMentor(null)}
              className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full md:w-[600px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto z-10"
            >
              <div className="relative pt-16 bg-[#0B1121] px-6 md:px-8 pb-6 flex-shrink-0">
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-end mt-4">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-white">
                    <Image 
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="text-center md:text-left pb-2">
                    <h2 className="text-3xl font-extrabold text-white mb-1">{selectedMentor.name}</h2>
                    <p className="text-[#F97316] font-semibold">{selectedMentor.designation}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Institution</p>
                    <p className="font-semibold text-[#0B1121]">{selectedMentor.institution}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0B1121] mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-8">
                  {selectedMentor.bio}
                </p>

                <h3 className="text-lg font-bold text-[#0B1121] mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedMentor.expertise.map(exp => {
                    const catData = categories.find(c => c.id === exp);
                    return (
                      <span key={exp} className={`text-sm px-3 py-1.5 rounded-lg font-semibold ${catData?.color || 'bg-gray-100 text-gray-600'}`}>
                        {exp}
                      </span>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="w-full py-4 bg-[#0B1121] text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
