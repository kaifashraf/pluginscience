'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const tiles = [
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
];

export default function HomeAudienceCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.85; 
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Floating Right Arrow for Mobile */}
      <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <button 
          onClick={() => scroll('right')}
          className="pointer-events-auto text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-16 h-16" strokeWidth={1.5} />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-px md:bg-[#0A0A0A]/10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full pb-8 md:pb-0"
      >
        {tiles.map((tile, i) => (
          <div 
            key={i} 
            className={`${tile.bg} p-10 md:p-14 flex flex-col justify-between min-h-[380px] md:min-h-[400px] group cursor-pointer w-[82vw] md:w-auto shrink-0 snap-center border border-[#0A0A0A]/10 md:border-0`}
          >
            <div>
              <h3 className={`font-display font-medium mb-6 leading-tight ${tile.dark ? 'text-white' : 'text-[#0A0A0A]'}`}
                  style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)' }}>
                {tile.title}
              </h3>
              <p className={`font-sans font-light leading-relaxed text-base md:text-lg ${tile.dark ? 'text-white/60' : 'text-[#666]'}`}>
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
  );
}
