'use client';

import { useRef, useState, useEffect } from 'react';
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

function MobileMarqueeCard({ d, index, isActive }: { d: any, index: number, isActive: boolean }) {
  return (
    <Link href={d.href} className="shrink-0 w-[78vw] snap-center discipline-card" data-index={index}>
      <div
        className={`p-8 flex flex-col justify-between min-h-[380px] group cursor-pointer transition-all duration-700 h-full whitespace-normal border ${
          isActive
            ? 'bg-white text-black border-white shadow-xl scale-[1.02] z-10 relative'
            : 'bg-white/[0.04] text-white border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1'
        }`}
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className={`text-xs font-mono transition-colors duration-700 ${isActive ? 'text-black/40' : 'text-white/20'}`}>
              {d.num}
            </span>
            <div className={`h-[1px] w-8 ${d.bar}`} />
          </div>
          <h3 className="font-display font-medium mb-2 text-2xl leading-tight">
            {d.title}
          </h3>
          <p className={`text-xs font-mono uppercase tracking-widest mb-5 transition-colors duration-700 ${isActive ? 'text-black/50' : 'text-white/30'}`}>
            {d.subtitle}
          </p>
          <p className={`font-sans font-light leading-relaxed text-sm line-clamp-3 transition-colors duration-700 ${isActive ? 'text-black/70' : 'text-white/50'}`}>
            {d.desc}
          </p>
        </div>
        <div className="flex items-center justify-end mt-6">
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-700 ${isActive ? 'border-black/10' : 'border-white/10 group-hover:border-white/40'}`}>
            <ArrowUpRight className={`w-3.5 h-3.5 transition-colors duration-700 ${isActive ? 'text-black/40' : 'text-white/30 group-hover:text-white'}`} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomeDisciplinesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isTouching = useRef(false);

  // Track the active card based on scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const children = el.querySelectorAll('.discipline-card');
      const containerCenter = el.getBoundingClientRect().left + el.offsetWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child) => {
        const idx = Number(child.getAttribute('data-index'));
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !isTouching.current) {
        const el = scrollRef.current;
        const currentScroll = el.scrollLeft;
        const cardWidth = window.innerWidth * 0.78 + 16; // width + gap
        
        // If we reach the end, scroll back to start
        if (currentScroll + el.clientWidth >= el.scrollWidth - 10) {
           el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
           el.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Mobile: Auto-playing swipable carousel ── */}
      <div 
        className="md:hidden relative w-full pb-8 pt-4 bg-transparent"
        onTouchStart={() => isTouching.current = true}
        onTouchEnd={() => {
           // Small delay to allow swipe momentum to finish before resuming auto-play
           setTimeout(() => isTouching.current = false, 2000);
        }}
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4"
        >
          {disciplines.map((d, i) => (
            <MobileMarqueeCard key={i} d={d} index={i} isActive={activeIndex === i} />
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
