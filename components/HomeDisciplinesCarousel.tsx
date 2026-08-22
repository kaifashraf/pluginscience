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
      {/* ── Mobile: Continuous Marquee ── */}
      <div className="md:hidden relative flex overflow-hidden w-full pb-4 bg-transparent group/marquee">
        {/* We render two identical lists side by side to create the infinite scroll effect */}
        {[...Array(2)].map((_, listIndex) => (
          <div key={listIndex} className="flex gap-4 animate-marquee whitespace-nowrap pl-4 group-hover/marquee:[animation-play-state:paused]">
            {disciplines.map((d, i) => (
              <Link href={d.href} key={`${listIndex}-${i}`} className="shrink-0 w-[78vw]">
                <div className="bg-white/[0.04] border border-white/10 p-8 flex flex-col justify-between min-h-[380px] group cursor-pointer hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 h-full whitespace-normal">
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
        ))}
      </div>

      {/* ── Desktop: Box layout ── */}
      <div className="hidden md:flex md:flex-col gap-8">
        {disciplines.map((d, i) => (
          <Link href={d.href} key={i}>
            <div
              className="group grid grid-cols-12 gap-8 py-20 px-12 cursor-pointer bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="col-span-1 flex items-start pt-2">
                <span className="text-white/20 text-base font-mono">{d.num}</span>
              </div>
              <div className="col-span-4 pr-12">
                <h3 className={`font-display font-medium text-white transition-colors duration-300 group-hover:${d.accent}`}
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
                  {d.title}
                </h3>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-4">{d.subtitle}</p>
              </div>
              <div className="col-span-6 flex items-center">
                <p className="text-white/50 font-sans font-light leading-relaxed text-xl group-hover:text-white/70 transition-colors duration-500">
                  {d.desc}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
