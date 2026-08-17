'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function AboutPage() {
  return (
    <div className="bg-[#F5F3EF] min-h-screen">

      {/* ── HERO ── */}
      <section className="pt-36 pb-24 bg-[#0A0A0A]">
        <div className="container-fluid">

          {/* top label row */}
          <div className="flex items-center justify-between mb-14 border-b border-white/10 pb-8">
            <span className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">About PluginScience</span>
            <span className="text-xs font-mono text-white/20 uppercase tracking-[0.2em]">Est. 2026</span>
          </div>

          {/* headline + sub */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <motion.h1
              {...fadeUp}
              className="font-display font-light text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
            >
              Where theory ends,<br />
              and engineering{' '}
              <em className="italic font-medium text-white/40">begins.</em>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/50 font-sans font-light leading-relaxed text-lg pb-1"
            >
              PluginScience is an elite technology ecosystem built for those who refuse to merely learn.
              We transform theoretical knowledge into real-world engineering through rigorous,
              hands-on workshops led by practicing researchers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-[#F5F3EF]">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <motion.div {...fadeUp}>
              <span className="text-xs font-mono text-[#aaa] uppercase tracking-[0.25em] block mb-6">01 / Mission</span>
              <h2
                className="font-display font-light text-[#0A0A0A] leading-[1.15]"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Theory fills the mind.<br />
                <em className="italic font-medium">Building shapes it.</em>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-[#666] font-sans font-light leading-relaxed text-lg mb-5">
                Traditional classrooms are excellent at conveying concepts. But understanding
                requires more than reading — it requires doing. PluginScience was founded to close that gap.
              </p>
              <p className="text-[#666] font-sans font-light leading-relaxed text-lg">
                Through structured workshops in aerospace, robotics, electronics, AI, and data
                science, we give students the tools, mentorship, and space to turn ideas into real
                working technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ── */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container-fluid">
          <div className="flex items-center gap-6 mb-14">
            <span className="text-xs font-mono text-white/30 uppercase tracking-[0.25em]">02 / The Difference</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              {
                num: '01',
                title: 'Built by Real Engineers',
                desc: 'Our curriculum is crafted by practicing aerospace researchers and software engineers — not theorists. Every module reflects what the industry actually demands.',
              },
              {
                num: '02',
                title: '80% Hands-On',
                desc: 'Students spend the vast majority of every session actively building, wiring, coding, and testing. Passive learning is not part of our design.',
              },
              {
                num: '03',
                title: 'Future-Ready Skills',
                desc: 'From aerodynamics to machine learning, we focus on the exact skills that will define careers over the next two decades.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="px-0 md:px-10 py-10 first:pl-0 last:pr-0"
              >
                <span className="text-xs font-mono text-white/20 block mb-5">{item.num}</span>
                <h3 className="font-display font-medium text-white text-2xl mb-3">{item.title}</h3>
                <p className="text-white/45 font-sans font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-20 bg-[#F5F3EF]">
        <div className="container-fluid">
          <div className="flex items-center gap-6 mb-14">
            <span className="text-xs font-mono text-[#aaa] uppercase tracking-[0.25em]">03 / Founders</span>
            <div className="flex-1 h-[1px] bg-[#0A0A0A]/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Portrait */}
            <motion.div {...fadeUp} className="lg:col-span-4">
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/gulam_sarwar.jpeg`}
                    alt="Dr. Md Gulam Sarwar"
                    fill
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p className="font-sans font-semibold text-[#0A0A0A] text-sm">Dr. Md Gulam Sarwar</p>
                    <p className="text-[#888] text-xs font-mono mt-1 uppercase tracking-wider">Founder &amp; Aerospace Researcher</p>
                  </div>
                  <div className="w-8 h-[2px] bg-[#0A0A0A] mt-2" />
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <div className="space-y-5 text-[#666] font-sans font-light leading-relaxed text-lg mb-10">
                <p>
                  PluginScience was founded by{' '}
                  <span className="text-[#0A0A0A] font-medium">Dr. Md Gulam Sarwar</span>, a researcher
                  specialising in space engineering and rocketry. He built PluginScience out of a deep conviction
                  that the most talented young minds in India deserve access to real engineering — not
                  just textbook theory.
                </p>
                <p>
                  Dr. Sarwar earned his Ph.D. from the{' '}
                  <span className="text-[#0A0A0A] font-medium">Birla Institute of Technology (BIT), Mesra</span>,
                  and served as a Postdoctoral Fellow at the Hypersonic Experimental Aerodynamics
                  Laboratory at{' '}
                  <span className="text-[#0A0A0A] font-medium">IIT Kanpur</span>. His expertise spans
                  high-speed aerodynamics, computational fluid dynamics, and the application of AI within
                  aerospace systems.
                </p>
                <p>
                  His research — from drag reduction in aerospace bodies to intelligent autonomous systems —
                  bridges the world of high-level academia and practical, scalable engineering education.
                </p>
              </div>

              <blockquote className="border-l-2 border-[#0A0A0A] pl-6 py-1">
                <p
                  className="font-display font-light text-[#0A0A0A] leading-[1.3]"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
                >
                  "We owe it to our students to let them build — not just read about building."
                </p>
                <cite className="text-xs font-mono text-[#aaa] uppercase tracking-[0.2em] block mt-4 not-italic">
                  Dr. Md Gulam Sarwar
                </cite>
              </blockquote>
            </motion.div>
          </div>

          {/* ── CO-FOUNDERS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start mt-24 border-t border-[#0A0A0A]/10 pt-16">
            
            {/* Devabrata */}
            <motion.div {...fadeUp}>
              <div className="relative w-36 h-36 mb-8 rounded-full overflow-hidden ring-4 ring-white shadow-xl shadow-[#0A0A0A]/5">
                <Image
                  src="https://faculty.kiit.ac.in/wp-content/uploads/2025/11/Aerospace_Devabrata.jpg"
                  alt="Dr. Devabrata Sahoo"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-sans font-semibold text-2xl text-[#0A0A0A]">Dr. Devabrata Sahoo</h3>
              <p className="text-[#888] text-xs font-mono mt-1 mb-5 uppercase tracking-wider">Co-Founder & Aerospace Expert</p>
              <p className="text-[#666] font-sans font-light leading-relaxed text-base">
                Dr. Devabrata Sahoo brings over 15 years of research experience specializing in experimental and computational aerodynamics. With a Ph.D. from Technion, Israel, and serving as faculty at KIIT University, he plays a crucial role in shaping PluginScience's advanced aerospace curriculum and bridging the gap between rigorous academia and hands-on innovation. He is also a published author, having co-edited the book <em className="italic font-medium text-[#0A0A0A]">"Advances in Aerospace Technologies"</em>.
              </p>
            </motion.div>

            {/* Kaif */}
            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="relative w-36 h-36 mb-8 rounded-full overflow-hidden ring-4 ring-white shadow-xl shadow-[#0A0A0A]/5">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Kaif.jpeg`}
                  alt="Syed Kaif Ashraf"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-sans font-semibold text-2xl text-[#0A0A0A]">Syed Kaif Ashraf</h3>
              <p className="text-[#888] text-xs font-mono mt-1 mb-5 uppercase tracking-wider">Co-Founder & Tech Lead</p>
              <p className="text-[#666] font-sans font-light leading-relaxed text-base">
                Syed Kaif Ashraf brings a deep passion for technology accessibility, focusing on Artificial Intelligence, Deep Learning, and Data Science. As a B.Tech CSE AIML graduate from Vellore Institute of Technology, his work includes participating in the prestigious Digital India RISC-V (DIR-V) Grand Challenge. He leads the technical execution and AI curriculum at PluginScience, ensuring students not only learn theory but build functional, real-world software projects.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-[0.25em] mb-4">Join PluginScience</p>
              <h2
                className="font-display font-light text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}
              >
                Ready to build<br />
                <em className="italic font-medium">something real?</em>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/workshops"
                className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-7 py-4 text-sm font-sans font-medium hover:bg-[#E8E4DC] transition-colors"
              >
                Explore Workshops
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/mentors"
                className="group inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 text-sm font-sans font-medium hover:border-white/50 transition-colors"
              >
                Apply as Mentor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
