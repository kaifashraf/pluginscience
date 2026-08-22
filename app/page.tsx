import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import HomeHero from '@/components/HomeHero';

const disciplines = [
  {
    num: '01',
    title: 'Aerospace & Drones',
    subtitle: 'From theory to the sky',
    desc: 'Build, calibrate, and fly. Master the science of aerodynamics, construct custom quadcopters and fixed wing aircraft, and program autonomous flight systems using real engineering tools.',
    accent: 'group-hover:text-theme-drone',
    bar: 'bg-theme-drone',
    href: '/workshops'
  },
  {
    num: '02',
    title: 'Robotics & Electronics',
    subtitle: 'Engineer the physical world',
    desc: 'Design and wire circuits, program microcontrollers, and bring mechanical systems to life. From basic electronics to advanced robotic arms, hands first, always.',
    accent: 'group-hover:text-theme-robotics',
    bar: 'bg-theme-robotics',
    href: '/workshops'
  },
  {
    num: '03',
    title: 'AI & Data Science',
    subtitle: 'Intelligence by design',
    desc: 'Train models, interpret data, and deploy intelligent systems. Work with computer vision, machine learning pipelines, and real world datasets to build software that thinks.',
    accent: 'group-hover:text-theme-data',
    bar: 'bg-theme-data',
    href: '/workshops'
  },
  {
    num: '04',
    title: 'Competitions & Events',
    subtitle: 'Prove your craft',
    desc: 'Hackathons, inter college drone races, science fairs, and innovation challenges. Compete, collaborate, and earn recognition alongside a network of ambitious builders.',
    accent: 'group-hover:text-theme-community',
    bar: 'bg-theme-community',
    href: '/contact'
  },
];


export default function Home() {
  return (
    <div className="bg-[#F5F3EF] min-h-screen">
      <HomeHero />

      {/* ═══════════════════════════════════════
          PILLARS ROW : launch-ready, aspirational
      ═══════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] border-t border-white/5">
        <div className="container-fluid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { icon: '✦', title: 'Hands-On First', desc: 'Every session is built around doing, not watching.' },
              { icon: '✦', title: 'Expert-Led', desc: 'Taught by engineers from premier institutions.' },
              { icon: '✦', title: 'Real Hardware', desc: 'Students work with actual drones, circuits & code.' },
              { icon: '✦', title: 'Open to All', desc: 'School students, college learners, and curious minds.' },
            ].map((p, i) => (
              <div key={i} className="py-12 px-8 group transition-all duration-500 hover:bg-white/[0.03] cursor-default">
                <span className="text-theme-drone text-xs font-mono mb-6 block transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">{p.icon}</span>
                <h4 className="font-display font-medium text-white/90 group-hover:text-white transition-colors duration-500 text-xl mb-3">{p.title}</h4>
                <p className="text-white/40 group-hover:text-white/70 transition-colors duration-500 text-sm font-sans font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="pt-16 pb-20 bg-[#F5F3EF]">
        <div className="container-fluid">

          {/* Main content: two column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

            {/* Left: the statement */}
            <div>
              <blockquote className="pl-8 border-l-2 border-[#0A0A0A]">
                <p
                  className="font-display font-light text-[#0A0A0A] leading-[1.25]"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
                >
                  We do not teach technology.<br />
                  We awaken the <em className="italic font-medium">builder within.</em>
                </p>
              </blockquote>
            </div>

            {/* Right: belief + sub-points */}
            <div className="flex flex-col justify-between gap-16">
              <p className="text-lg font-sans font-light text-[#555] leading-relaxed">
                We run hands-on workshops across India for school and college students. Every session is built around doing, not listening. Students go home with something they built themselves.
              </p>

              <div className="space-y-10">
                <div className="flex gap-6">
                  <span className="text-theme-drone text-xs font-mono mt-1 flex-shrink-0">✦</span>
                  <div>
                    <h4 className="font-sans font-medium text-[#0A0A0A] mb-2">Curiosity, Kindled.</h4>
                    <p className="text-sm text-[#777] font-sans font-light leading-relaxed">
                      Every session starts with a real question, one students actually care about finding the answer to.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="text-theme-robotics text-xs font-mono mt-1 flex-shrink-0">✦</span>
                  <div>
                    <h4 className="font-sans font-medium text-[#0A0A0A] mb-2">Skills, Forged.</h4>
                    <p className="text-sm text-[#777] font-sans font-light leading-relaxed">
                      Students leave with the confidence that comes from having built something real, no certificate can replicate that.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DISCIPLINES : full-width accordion rows
      ═══════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] pt-16 pb-20">
        <div className="container-fluid">
          <div className="flex items-end justify-between mb-12 pb-8 border-b border-white/10">
            <div>
              <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                What we teach.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 text-white/50 text-sm font-sans transition-colors group">
              More Programmes Coming Soon
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {disciplines.map((d, i) => (
              <Link href={d.href} key={i}>
                <div
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 md:py-14 cursor-pointer hover:bg-white/[0.02] transition-colors px-2"
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span className="text-white/20 text-sm font-mono">{d.num}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className={`font-display font-medium text-white transition-colors duration-300 ${d.accent}`}
                        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                      {d.title}
                    </h3>
                    <p className="text-white/30 text-xs font-mono uppercase tracking-widest mt-2">{d.subtitle}</p>
                  </div>
                  <div className="md:col-span-6 flex items-center">
                    <p className="text-white/50 font-sans font-light leading-relaxed text-base md:text-lg opacity-0 md:opacity-100 md:translate-x-4 group-hover:translate-x-0 group-hover:text-white/70 transition-all duration-500">
                      {d.desc}
                    </p>
                  </div>
                  <div className="md:col-span-1 flex items-center justify-end">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHO IS THIS FOR : 3 tiles
      ═══════════════════════════════════════ */}
      <section className="pt-16 pb-24 bg-[#F5F3EF]">
        <div className="container-fluid">
          <div className="mb-12">
            <h2 className="font-display font-light text-[#0A0A0A]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Who should join?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0A0A0A]/10">
            {[
              {
                title: 'Students & Learners',
                desc: 'School or college, curious or passionate, if you want to build real things and understand how technology actually works, this is for you.',
                cta: 'Browse Workshops',
                href: '#',
                bg: 'bg-[#F5F3EF]',
              },
              {
                title: 'Schools & Institutions',
                desc: 'Bring a live engineering workshop to your campus. We design, deliver, and manage everything, from materials to mentorship.',
                cta: 'Partner With Us',
                href: '/contact',
                bg: 'bg-[#0A0A0A]',
                dark: true,
              },
              {
                title: 'Mentors & Experts',
                desc: 'If you are an engineer, researcher, or practitioner who wants to give back, join our growing network of mentors and workshop facilitators.',
                cta: 'Apply to Mentor',
                href: '/mentors',
                bg: 'bg-[#F5F3EF]',
              },
            ].map((tile, i) => (
              <div key={i} className={`${tile.bg} p-14 flex flex-col justify-between min-h-[400px] group`}>
                <div>
                  <h3 className={`font-display font-medium mb-6 leading-tight ${tile.dark ? 'text-white' : 'text-[#0A0A0A]'}`}
                      style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)' }}>
                    {tile.title}
                  </h3>
                  <p className={`font-sans font-light leading-relaxed text-lg ${tile.dark ? 'text-white/60' : 'text-[#666]'}`}>
                    {tile.desc}
                  </p>
                </div>
                <Link href={tile.href}>
                  <div className={`flex items-center gap-3 text-sm font-sans font-medium group/link mt-12 ${tile.dark ? 'text-white/70 hover:text-white' : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A]'} transition-colors`}>
                    {tile.cta}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA : minimal, typographic
      ═══════════════════════════════════════ */}
      <section className="py-40 bg-[#0A0A0A] text-center overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display font-light text-white/[0.03]" style={{ fontSize: 'clamp(8rem, 25vw, 24rem)' }}>
            PluginScience
          </span>
        </div>
        <div className="container-fluid relative z-10">
          <div>
            <p className="text-white/40 text-xs font-mono uppercase tracking-[0.25em] mb-10">Begin here.</p>
            <h2 className="font-display font-light text-white leading-[1] mb-14"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}>
              Your next build<br />
              <em className="italic font-medium">starts today.</em>
            </h2>
            <Link href="/workshops">
              <button className="group inline-flex items-center gap-4 bg-[#F5F3EF] text-[#0A0A0A] px-10 py-5 text-base font-sans font-medium hover:bg-white transition-colors">
                View All Workshops
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
