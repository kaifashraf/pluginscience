'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { FlaskConical, Bot, School, HeartHandshake, Compass, Rocket, Star, Microscope, Atom, GraduationCap, Notebook, Search, FileText, BookOpen, Award, Sparkles, Check } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};



export default function HomeStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-white overflow-hidden text-[#11161F]">
      
      {/* SECTION 1: Why PluginScience Exists */}
      <section className="py-24 md:py-32 relative bg-[#0B1121]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00C3FF]/5 to-[#0B1121] pointer-events-none" />
        <div className="container-plugin max-w-7xl mx-auto relative z-10">
          
          {/* Background Floating Line Illustrations */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {[
                { icon: Rocket, top: '10%', left: '15%', delay: 0 },
                { icon: Microscope, top: '40%', left: '5%', delay: 2 },
                { icon: Atom, top: '70%', left: '10%', delay: 1 },
                { icon: GraduationCap, top: '15%', right: '15%', delay: 3 },
                { icon: Notebook, top: '50%', right: '8%', delay: 0.5 },
                { icon: Bot, top: '80%', right: '20%', delay: 2.5 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/5"
                  style={{ top: item.top, left: item.left, right: item.right }}
                  animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0], x: [0, 10, -10, 0] }}
                  transition={{ duration: 15 + i * 2, repeat: Infinity, delay: item.delay, ease: 'linear' }}
                >
                  <item.icon className="w-16 h-16 md:w-24 md:h-24 stroke-[1px]" />
                </motion.div>
              ))}
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
              {/* Left Column: Heading & Text */}
              <div className="sticky top-32 text-left">
                <motion.h2 
                  {...fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white mb-8 tracking-tight leading-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Curiosity</span> Creates <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Tomorrow&apos;s Leaders</span>
                </motion.h2>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-[550px]"
                >
                  <p className="mb-6">
                    Every workshop is an opportunity to <span className="text-[#00C3FF] font-semibold">discover</span> new interests, <span className="text-[#00C3FF] font-semibold">build</span> practical skills, <span className="text-[#00C3FF] font-semibold">think</span> creatively, <span className="text-[#00C3FF] font-semibold">work</span> with inspiring mentors, and <span className="text-[#00C3FF] font-semibold">grow</span> into a confident learner.
                  </p>
                  <p>
                    These early moments of discovery are what shape the <span className="text-[#00C3FF] font-semibold">innovators</span>, <span className="text-[#00C3FF] font-semibold">artists</span>, and <span className="text-[#00C3FF] font-semibold">problem solvers</span> of tomorrow. By providing <span className="text-[#00C3FF] font-semibold">hands-on experiences</span> and expert guidance, we help students unlock their <span className="text-[#00C3FF] font-semibold">full potential</span> and turn their natural curiosity into <span className="text-[#00C3FF] font-semibold">real-world capabilities</span>.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Cards */}
              <div className="flex flex-col gap-6 lg:gap-8">
                {[
                  { icon: Compass, title: 'Discover', desc: 'Explore workshops designed to inspire curiosity across science, technology, creativity, leadership, and more.', gradient: 'from-blue-600 to-cyan-500', cardBg: 'bg-blue-50 hover:bg-blue-100', iconColor: 'text-blue-600' },
                  { icon: Rocket, title: 'Experience', desc: 'Learn through real activities, collaborative projects, and interactive sessions that go beyond textbooks.', gradient: 'from-orange-500 to-rose-500', cardBg: 'bg-orange-50 hover:bg-orange-100', iconColor: 'text-orange-600' },
                  { icon: Star, title: 'Grow', desc: 'Build confidence, earn certificates, discover new passions, and prepare for future opportunities.', gradient: 'from-emerald-600 to-teal-500', cardBg: 'bg-emerald-50 hover:bg-emerald-100', iconColor: 'text-emerald-600' }
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 250 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={cn("h-full rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:-translate-y-3 transition-all duration-300 relative group overflow-hidden", card.cardBg)}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-sm">
                        <card.icon className={cn("w-6 h-6 z-10", card.iconColor)} strokeWidth={2} />
                      </div>
                      <h3 className={cn("text-2xl font-bold mb-4 relative z-10 text-transparent bg-clip-text bg-gradient-to-r", card.gradient)}>{card.title}</h3>
                      <p className="text-gray-600 leading-relaxed relative z-10">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Inspirational Statement & Call to Action */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="py-24 px-8 rounded-[48px] bg-gradient-to-b from-[#111827] to-[#0B1121] backdrop-blur-2xl border border-white/5 shadow-2xl relative overflow-hidden group text-center"
            >
              {/* Dynamic Glow Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,165,0,0.15),transparent_70%)] pointer-events-none transition-opacity duration-700 opacity-80 group-hover:opacity-100" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

              <h3 className="text-4xl md:text-5xl lg:text-7xl font-sans font-extrabold tracking-tight mb-14 max-w-5xl mx-auto relative z-10 leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">Learning </span>
                <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 pr-2">Beyond</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"> the Classroom.</span>
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/workshops">
                    <Button size="lg" className="bg-white text-slate-900 border-0 shadow-[0_0_40px_rgba(255,255,255,0.2)] font-sans font-bold tracking-wide text-lg px-12 h-16 rounded-full hover:bg-gray-100 transition-all">
                      View Our Programs
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/mentors">
                    <Button size="lg" className="bg-transparent backdrop-blur-md border-2 border-white/10 text-white font-sans font-bold tracking-wide text-lg px-12 h-16 rounded-full hover:bg-white/10 hover:border-white/20 transition-all">
                      Meet Our Mentors
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Interactive Audience Cards */}
      <section className="py-24 bg-gradient-to-br from-indigo-100 via-purple-100 to-orange-100 relative overflow-hidden">
        {/* Abstract shapes for more mixed color effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-200/40 blur-3xl" />
        </div>
        <div className="container-plugin max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: Compass,
                title: 'I Want to Explore',
                desc: 'Discover exciting workshops and uncover new passions through fun experiences.',
                gradient: 'from-green-400 to-emerald-500',
                bg: 'bg-green-200',
                iconColor: 'text-green-600',
                href: '/workshops'
              },
              {
                icon: Notebook,
                title: 'I Want to Learn',
                desc: 'Build practical skills through interactive activities beyond the classroom.',
                gradient: 'from-blue-400 to-[#00C3FF]',
                bg: 'bg-blue-200',
                iconColor: 'text-blue-600',
                href: '/workshops'
              },
              {
                icon: HeartHandshake,
                title: 'I Want to Volunteer',
                desc: 'Share your knowledge and inspire the next generation of learners.',
                gradient: 'from-purple-400 to-indigo-500',
                bg: 'bg-purple-200',
                iconColor: 'text-purple-600',
                href: '/mentors'
              },
              {
                icon: School,
                title: 'I Represent a School',
                desc: 'Bring engaging workshops directly to your students.',
                gradient: 'from-[#FF8C42] to-rose-400',
                bg: 'bg-orange-200',
                iconColor: 'text-orange-600',
                href: '/contact'
              }
            ].map((card, i) => (
              <Link href={card.href} key={i} className="block h-full cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={cn(
                    "relative group overflow-hidden rounded-[24px] md:rounded-[32px] p-8 md:p-10 transition-all duration-500 h-full",
                    card.bg,
                    "shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]",
                    "border-2 border-gray-200"
                  )}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${card.gradient} transition-opacity duration-500`} />
                  
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-white">
                    <card.icon className={cn("w-8 h-8", card.iconColor)} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gray-500 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Learning Journey */}
      <section className="py-24 overflow-hidden">
        <div className="container-plugin max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#11161F]">
              The Learning Journey
            </h2>
          </motion.div>

          <div className="relative">
            {/* Desktop connecting line (Centered on the 80px circles) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] -translate-y-1/2 bg-gradient-to-r from-orange-200 via-[#00C3FF] to-pink-300" />
            
            {/* Mobile connecting line (Centered on the 64px circles) */}
            <div className="md:hidden absolute top-[10%] bottom-[10%] left-[32px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-orange-200 via-[#00C3FF] to-pink-300" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10">
              {[
                { icon: <Search className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />, title: 'Inquire', color: 'group-hover:border-orange-400 group-hover:shadow-orange-500/25', bg: 'group-hover:bg-orange-50' },
                { icon: <FileText className="w-8 h-8 text-[#00C3FF] group-hover:scale-110 transition-transform" />, title: 'Register', color: 'group-hover:border-[#00C3FF] group-hover:shadow-[#00C3FF]/25', bg: 'group-hover:bg-cyan-50' },
                { icon: <BookOpen className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />, title: 'Learn', color: 'group-hover:border-blue-400 group-hover:shadow-blue-500/25', bg: 'group-hover:bg-blue-50' },
                { icon: <Award className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />, title: 'Earn Certification', color: 'group-hover:border-purple-400 group-hover:shadow-purple-500/25', bg: 'group-hover:bg-purple-50' },
                { icon: <Sparkles className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />, title: 'Discover Your Passion', color: 'group-hover:border-pink-400 group-hover:shadow-pink-500/25', bg: 'group-hover:bg-pink-50' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: 'spring' }}
                  className="flex md:flex-col items-center gap-6 md:gap-5 group cursor-default"
                >
                  <div className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center border-2 border-white transition-all duration-300 ${step.color} z-10`}>
                    <div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${step.bg} -z-10`} />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-50 group-hover:text-gray-800 transition-colors">
                      {i + 1}
                    </div>

                    <span className="relative z-10">{step.icon}</span>
                  </div>
                  <div className="text-left md:text-center w-full md:max-w-[160px]">
                    <h4 className="font-bold text-gray-800 text-lg md:text-xl leading-[1.2] tracking-tight group-hover:text-gray-900 transition-colors">
                      {step.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>





      {/* SECTION 6: Final Call to Action */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-[#0A0D12]">
        {/* Colorful Abstract Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00C3FF] rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF8C42] rounded-full mix-blend-screen filter blur-[120px] opacity-50" />
        </div>

        {/* Floating Educational Icons */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none text-white/20">
            {[
              { icon: <BookOpen size={48} />, top: '10%', left: '10%', delay: 0 },
              { icon: <FlaskConical size={48} />, top: '20%', left: '80%', delay: 1 },
              { icon: <Bot size={48} />, top: '70%', left: '15%', delay: 2 },
              { icon: <Rocket size={48} />, top: '80%', left: '85%', delay: 0.5 },
              { icon: <Compass size={48} />, top: '40%', left: '90%', delay: 1.5 },
              { icon: <Sparkles size={48} />, top: '60%', left: '5%', delay: 2.5 },
              { icon: <Atom size={48} />, top: '15%', left: '50%', delay: 0.8 },
              { icon: <GraduationCap size={48} />, top: '85%', left: '50%', delay: 1.2 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-40"
                style={{ top: item.top, left: item.left }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeInOut'
                }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        )}

        <div className="container-plugin max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#00C3FF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base"
            >
              Empower the Next Generation
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight"
            >
              Turning Curiosity into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FFD54F]">Capability</span>
            </motion.h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full max-w-2xl mx-auto text-left"
          >
            <motion.p variants={staggerItem} className="text-lg md:text-xl text-gray-300 font-sans leading-relaxed mb-10">
              Every great achievement begins with a question. At PluginScience, we create hands-on learning experiences that help students explore new ideas, develop practical skills, and gain the confidence to shape their future.
            </motion.p>
            
            <motion.div variants={staggerItem} className="w-full h-px bg-gradient-to-r from-gray-800 via-gray-600 to-transparent mb-10" />
            
            <motion.ul variants={staggerItem} className="space-y-5 mb-10 px-4">
              {[
                "Learn by Doing",
                "Guided by Expert Mentors",
                "Build Skills That Matter"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center text-gray-200 text-lg md:text-xl">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-5 shrink-0 border border-green-500/30">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  {benefit}
                </li>
              ))}
            </motion.ul>
            
            <motion.div variants={staggerItem} className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-800 mb-12" />
            
            <motion.div 
              variants={staggerItem}
              className="flex justify-center"
            >
              <Link href="/workshops">
                <Button size="lg" className="bg-[#00C3FF] hover:bg-white text-white hover:text-[#00C3FF] h-14 px-10 text-lg rounded-full font-bold tracking-wider shadow-[0_0_40px_rgba(0,195,255,0.4)] transition-all hover:scale-105 active:scale-95">
                  Explore Workshops
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
