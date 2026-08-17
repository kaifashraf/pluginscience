'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  // Defer video loading so the 2.7MB file doesn't compete with critical resources
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero/workshop.mp4`;
      video.load();
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          poster={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero/frames-lowres/frame_001.webp`}
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      </div>

      {/* Main headline */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute bottom-0 left-0 right-0 z-10 container-fluid pb-4"
      >
        <div className="animate-slide-up" style={{ animationDuration: '1.4s' }}>
          {/* Giant Display Headline */}
          <h1 className="font-display font-light text-white leading-[0.88] tracking-tight mb-10 whitespace-nowrap"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 13rem)' }}>
            Where Builders<br />
            <em className="not-italic font-medium" style={{ color: '#E8E4DC' }}>Are Born.</em>
          </h1>

          {/* Bottom row: description + CTA */}
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-24 border-t border-white/10 pt-10 mt-16">
            <p className="text-white/70 text-xl font-sans font-light leading-relaxed max-w-lg">
              Hands-on workshops in aerospace, robotics, AI, and beyond. For students who want to make things that actually work.
            </p>
            <div className="flex items-center gap-8 flex-shrink-0">
              <Link href="/workshops">
                <button className="group flex items-center gap-4 bg-white text-[#0A0A0A] px-8 py-4 text-sm font-sans font-medium hover:bg-[#E8E4DC] transition-colors">
                  Explore Workshops
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/about" className="text-white/70 text-sm font-sans hover:text-white transition-colors border-b border-white/30 pb-0.5 hover:border-white">
                About PluginScience
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
