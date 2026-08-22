'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import Button from '@/components/ui/Button';
import HudBracket from '@/components/ui/HudBracket';
import PluginLogo from '@/components/brand/PluginLogo';

interface HeroAntiGravityDroneProps {
  autoplayDuration?: number;
}

export default function HeroAntiGravityDrone({
  autoplayDuration = 15000,
}: HeroAntiGravityDroneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [autoplayComplete, setAutoplayComplete] = useState(false);

  // Audio ref for background music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Defer loading to improve LCP
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 1) {
      setVideoLoaded(true);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // don't load video if reduced motion

    const timer = setTimeout(() => {
      video.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero/workshop.mp4`;
      video.load();
      // autoplay logic is handled by the video element once src is set if autoplay attribute is present, but we will call play() to be safe.
      video.play().catch(() => {});
    }, window.innerWidth < 768 ? 2000 : 500);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handleVideoEnded = () => {
    setAutoplayComplete(true);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const [isMuted, setIsMuted] = useState(true);

  // Handle Audio Engine
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/hero/workshop.mp3');
      audioRef.current.volume = 0.6;
    }

    const unlockAudio = () => {
      if (audioRef.current && videoLoaded) {
        // Only play if the video has not already finished
        if (videoRef.current && !videoRef.current.ended) {
          audioRef.current.play().then(() => setIsMuted(false)).catch(e => console.warn("Still blocked:", e));
        }
        
        // Remove listeners once unlocked
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('scroll', unlockAudio);
      }
    };

    if (videoLoaded) {
      // Try playing immediately
      audioRef.current.play().then(() => setIsMuted(false)).catch(e => {
        console.warn("Audio playback blocked natively, waiting for interaction:", e);
        // If blocked, wait for any user interaction to unlock it
        window.addEventListener('click', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);
        window.addEventListener('keydown', unlockAudio);
        window.addEventListener('scroll', unlockAudio, { passive: true });
      });

      // Ensure video is playing
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [videoLoaded]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().then(() => setIsMuted(false)).catch(console.error);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '100vh' }}
    >
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-plugin-bg">
        
        {/* Video Element (replaces canvas) */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] pointer-events-none select-none"
          muted
          playsInline
          preload="none"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          onEnded={handleVideoEnded}
          onLoadedMetadata={handleVideoLoaded}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
        />

        {/* Targeted blur over the Gemini watermark in the bottom right of the video */}
        <div 
          className="absolute bottom-4 right-6 w-28 h-28 bg-[#0A0D12]/80 backdrop-blur-3xl z-20 pointer-events-none rounded-3xl" 
        />

        {/* Sound Toggle Button (Mobile Only) */}
        {videoLoaded && (
          <button
            onClick={toggleSound}
            className="md:hidden absolute bottom-28 right-8 z-30 w-12 h-12 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>
        )}

        {/* Loading indicator */}
        <AnimatePresence>
          {!videoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-plugin-bg z-20"
            >
              <div className="space-y-8 flex flex-col items-center text-center">
                <PluginLogo variant="icon" size="xl" animated={true} theme="dark" />
                <div className="hud-label text-sm animate-pulse text-plugin-cyan tracking-[0.2em]">
                  INITIALIZING WORKSHOP...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay text — appears after autoplay */}
        <AnimatePresence>
          {autoplayComplete && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-plugin-bg via-transparent to-plugin-bg/30" />

              <div className="relative text-center space-y-6 pointer-events-auto px-4">
                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-[360px] md:pt-[380px]"
                >
                  <HudBracket size={20}>
                    <Button size="lg" className="font-display tracking-wider uppercase">
                      Explore Workshop
                    </Button>
                  </HudBracket>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-2 text-plugin-text-secondary"
                >
                  <span className="text-label uppercase tracking-[0.2em] font-mono text-[10px]">
                    Scroll to explore
                  </span>
                  <ChevronDown className="w-5 h-5 text-plugin-cyan" />
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>



        {/* Ambient effects */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#0A0D12_100%)]" />
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-overlay opacity-30" />
        </div>
      </div>
    </div>
  );
}
