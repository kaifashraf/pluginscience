'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MentorsHero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 rounded-full blur-[120px] opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/4" />
      
      <div className="container-plugin relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div 
              {...fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8"
            >
              <span className="text-xl">👨‍🏫</span>
              <span className="text-sm font-bold text-[#F97316] tracking-widest uppercase">Our Mentors</span>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1121] mb-6 tracking-tight leading-[1.1]"
            >
              Meet the Minds{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#fb923c]">
                Inspiring Tomorrow
              </span>
            </motion.h1>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed max-w-xl"
            >
              Behind every great workshop is a mentor who believes that learning should be practical, engaging, and inspiring. At Plug-in, our mentors come from leading institutions and diverse professional backgrounds, helping students transform curiosity into confidence through real-world experiences.
            </motion.p>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#apply">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#0B1121] text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2 group">
                  Join as Mentor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Illustration/Collage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[600px] w-full"
          >
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop"
                alt="Mentors teaching students"
                fill
                className="object-cover"
                priority
              />
              {/* Glassmorphism accent card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl">
                <p className="font-medium text-[#0B1121] text-lg">
                  "Empowering the next generation of innovators with practical skills and unshakeable confidence."
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(#F97316_2px,transparent_2px)] [background-size:12px_12px] opacity-20 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[radial-gradient(#0B1121_2px,transparent_2px)] [background-size:16px_16px] opacity-10 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
