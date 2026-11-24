'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { disciplines } from '@/components/homeDisciplines.data';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  // Load the video after first paint; under reduced motion keep the still poster.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setTimeout(() => {
      video.src = `${base}/hero/workshop.webm`;
      video.load();
      video
        .play()
        .then(() => {
          setPlaying(true);
          setCanPlay(true);
        })
        .catch(() => setCanPlay(true));
    }, window.innerWidth < 768 ? 2000 : 500);

    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="hm-hero on-ink" aria-labelledby="hero-title">
      <div className="hm-hero__media" aria-hidden="true">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          poster={`${base}/hero/poster.webp`}
        />
      </div>

      <div className="hm-container hm-hero__content">
        <div className="hm-grid hm-hero__top">
          <h1 id="hero-title">Build the drone.<br />Then fly it.</h1>
          <div className="hm-hero__side">
            <p className="hm-hero__line">
              Workshops in drones, robotics and AI for school and college students.
            </p>
            <div className="hm-hero__actions">
              <Link href="/products/workshops" className="hm-btn">
                See the workshops
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/about" className="hm-link">
                Who teaches here
              </Link>
            </div>
          </div>
        </div>

        <ol className="hm-index" aria-label="Disciplines">
          {disciplines.map((d) => (
            <li key={d.id} className={`disc-${d.id}`}>
              <Link href={d.href}>
                <span className="hm-index__title">
                  {d.title}
                  <ArrowUpRight aria-hidden="true" />
                </span>
                <span className="hm-index__sub">{d.subtitle}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {canPlay && (
        <button
          type="button"
          className="hm-hero__pause"
          onClick={toggle}
          aria-label={playing ? 'Pause background video' : 'Play background video'}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      )}
    </section>
  );
}
