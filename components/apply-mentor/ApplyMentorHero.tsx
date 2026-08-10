'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Users, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ApplyMentorHero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const features = [
    'Flexible mentoring schedule',
    'Build your community',
    'Earn income or volunteer to gain experience',
    'Verified mentor profile'
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
      <div className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-plugin relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
              <span className="text-sm font-semibold text-[#FF7A00] tracking-wide uppercase">Join the Top 1%</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1121] mb-6 tracking-tight leading-[1.1]">
              Become a Mentor &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9D40]">
                Inspire the Next Generation
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 mb-8 font-light leading-relaxed max-w-xl">
              Share your expertise, build your personal brand, connect with ambitious learners, and earn income or volunteer to gain experience by helping others grow.
            </motion.p>

            <motion.ul variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#FF7A00] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="#apply-form" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-[#FF7A00] text-white rounded-2xl font-semibold hover:bg-[#e66e00] transition-all shadow-lg shadow-[#FF7A00]/25 flex items-center justify-center gap-2 group">
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="#why-mentor" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-white text-[#0B1121] rounded-2xl font-semibold hover:bg-gray-50 border border-gray-200 transition-all shadow-sm flex items-center justify-center">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image with Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[650px] w-full mt-10 lg:mt-0"
          >
            {/* Main Image */}
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
                alt="Mentor guiding student during online session"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Card 1 - Rating */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-12 -left-6 md:-left-12 bg-white/90 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-[#FF7A00] fill-[#FF7A00]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Mentor Rating</p>
                <p className="text-xl font-bold text-[#0B1121]">4.9 <span className="text-sm font-normal text-gray-400">/5.0</span></p>
              </div>
            </motion.div>

            {/* Floating Card 2 - Students */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-32 -right-6 md:-right-8 bg-white/90 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[float_7s_ease-in-out_infinite]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Students Mentored</p>
                <p className="text-xl font-bold text-[#0B1121]">500+</p>
              </div>
            </motion.div>

            {/* Floating Card 3 - Earnings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0B1121] border border-gray-800 p-5 rounded-2xl shadow-2xl flex items-center gap-4 whitespace-nowrap"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Monthly Earnings</p>
                <p className="text-2xl font-bold text-white">$2,000+</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
