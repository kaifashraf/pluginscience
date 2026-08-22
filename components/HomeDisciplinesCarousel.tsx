'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

const disciplines = [
  {
    num: '01',
    title: 'Aerospace & Drones',
    subtitle: 'From theory to the sky',
    desc: 'Build, calibrate, and fly. Master the science of aerodynamics, construct custom quadcopters and fixed wing aircraft, and program autonomous flight systems using real engineering tools.',
    accent: 'text-theme-drone',
    bar: 'bg-theme-drone',
    href: '/workshops'
  },
  {
    num: '02',
    title: 'Robotics & Electronics',
    subtitle: 'Engineer the physical world',
    desc: 'Design and wire circuits, program microcontrollers, and bring mechanical systems to life. From basic electronics to advanced robotic arms, hands first, always.',
    accent: 'text-theme-robotics',
    bar: 'bg-theme-robotics',
    href: '/workshops'
  },
  {
    num: '03',
    title: 'AI & Data Science',
    subtitle: 'Intelligence by design',
    desc: 'Train models, interpret data, and deploy intelligent systems. Work with computer vision, machine learning pipelines, and real world datasets to build software that thinks.',
    accent: 'text-theme-data',
    bar: 'bg-theme-data',
    href: '/workshops'
  },
  {
    num: '04',
    title: 'Competitions & Events',
    subtitle: 'Prove your craft',
    desc: 'Hackathons, inter college drone races, science fairs, and innovation challenges. Compete, collaborate, and earn recognition alongside a network of ambitious builders.',
    accent: 'text-theme-community',
    bar: 'bg-theme-community',
    href: '/contact'
  },
];

export default function HomeDisciplinesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.78;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Mobile: Horizontal carousel ── */}
      <div className="md:hidden relative">
        {/* Floating Right Arrow */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto text-white/80 hover:text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-14 h-14" strokeWidth={1.5} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 px-4 md:px-0"
        >
          {disciplines.map((d, i) => (
            <Link href={d.href} key={i} className="shrink-0 w-[78vw] snap-start">
              <div className="bg-white/[0.04] border border-white/10 p-8 flex flex-col justify-between min-h-[380px] group cursor-pointer hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-white/20 text-xs font-mono">{d.num}</span>
                    <div className={`h-[1px] w-8 ${d.bar}`} />
                  </div>
                  <h3 className={`font-display font-medium text-white mb-2 text-2xl leading-tight`}>
                    {d.title}
                  </h3>
                  <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-5">{d.subtitle}</p>
                  <p className="text-white/50 font-sans font-light leading-relaxed text-sm line-clamp-3">
                    {d.desc}
                  </p>
                </div>
                <div className="flex items-center justify-end mt-6">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Desktop: Original list layout ── */}
      <div className="hidden md:block divide-y divide-white/10">
        {disciplines.map((d, i) => (
          <Link href={d.href} key={i}>
            <div
              className="group grid grid-cols-12 gap-6 py-14 cursor-pointer hover:bg-white/[0.02] transition-colors px-2 relative"
            >
              <div className="col-span-1 flex items-start pt-1">
                <span className="text-white/20 text-sm font-mono">{d.num}</span>
              </div>
              <div className="col-span-4">
                <h3 className={`font-display font-medium text-white transition-colors duration-300 group-hover:${d.accent}`}
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                  {d.title}
                </h3>
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest mt-2">{d.subtitle}</p>
              </div>
              <div className="col-span-6 flex items-center">
                <p className="text-white/50 font-sans font-light leading-relaxed text-lg translate-x-4 group-hover:translate-x-0 group-hover:text-white/70 transition-all duration-500">
                  {d.desc}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
