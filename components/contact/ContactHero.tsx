'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ContactHero() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-plugin-surface to-white overflow-hidden pt-32 pb-24 flex items-center">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-orange-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="w-full mx-auto px-4 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-orange-100 mb-8 shadow-sm">
              <Mail className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-bold text-[#F97316] tracking-widest uppercase">Contact Us</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1121] leading-[1.1] mb-8 tracking-tight">
              Let's Build the <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-pink-600">
                Future Together
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl font-light leading-relaxed">
              Whether you're a student eager to explore new opportunities, a school planning impactful workshops, or a professional passionate about mentoring young minds, we'd love to hear from you.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl font-light leading-relaxed">
              Every conversation is the beginning of a new opportunity to inspire, innovate, and create meaningful learning experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link href="#contact-grid" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-[#F97316] to-[#DD512D] text-white rounded-full font-bold px-10 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300">
                  Send a Message
                </Button>
              </Link>
              <Link href="/workshops" className="w-full sm:w-auto">
                <Button size="lg" variant="ghost" className="w-full bg-white/50 backdrop-blur-md text-[#0B1121] border-2 border-gray-200 rounded-full font-bold px-10 hover:border-[#0B1121] hover:bg-white transition-all duration-300 group flex items-center justify-center gap-2">
                  Explore Workshops
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image/Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/contact_hero_illustration.png`}
                alt="Students, teachers, and mentors collaborating"
                fill
                priority
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Floating ambient light effects behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full -z-10 mix-blend-overlay pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
