'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { disciplines } from '@/components/homeDisciplines.data';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function HomeDisciplines() {
  const [active, setActive] = useState(0);
  // Without script every panel shows in order; tabs take over once hydrated.
  const [ready, setReady] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => setReady(true), []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = disciplines.length - 1;
    let next = active;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="hm-disc" aria-labelledby="disc-title">
      <div className="hm-container hm-grid">
        <div className="hm-disc__head">
          <h2 id="disc-title">Pick where you want to start</h2>
          <div
            className="hm-tabs"
            role="tablist"
            aria-label="Disciplines"
            aria-orientation="vertical"
            onKeyDown={onKey}
            hidden={!ready}
          >
            {disciplines.map((d, i) => (
              <button
                key={d.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`disc-tab-${d.id}`}
                aria-selected={active === i}
                aria-controls={`disc-panel-${d.id}`}
                tabIndex={active === i ? 0 : -1}
                className={`hm-tab disc-${d.id}`}
                onClick={() => setActive(i)}
              >
                {d.title}
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className="hm-tabs__note">More subjects are on the way.</p>
        </div>

        <div className="hm-panels">
          {disciplines.map((d, i) => (
            <div
              key={d.id}
              id={`disc-panel-${d.id}`}
              role={ready ? 'tabpanel' : undefined}
              aria-labelledby={ready ? `disc-tab-${d.id}` : undefined}
              hidden={ready && active !== i}
              className={`hm-panel disc-${d.id}`}
            >
              <figure className="hm-panel__media">
                <img
                  src={`${base}/home/${d.id}.webp`}
                  alt={d.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="hm-panel__body">
                <div>
                  <h3>{d.title}</h3>
                  <p className="hm-panel__sub">{d.subtitle}</p>
                </div>
                <div className="hm-panel__foot">
                  <p>{d.desc}</p>
                  <Link href={d.href} className="hm-link">
                    {d.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
