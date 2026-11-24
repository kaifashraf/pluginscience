import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { disciplines } from '@/components/homeDisciplines.data';

export default function HomeHero() {
  return (
    <section className="hm-hero on-ink" aria-labelledby="hero-title">
      <div className="hm-container">
        <div className="hm-grid hm-hero__top">
          <h1 id="hero-title">Where Builders Are Born.</h1>
          <div className="hm-hero__side">
            <p className="hm-hero__line">
              Hands-on workshops for students who want to make things that work.
            </p>
            <div className="hm-hero__actions">
              <Link href="/products/workshops" className="hm-btn">
                Explore Workshops
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/about" className="hm-link">
                About PluginScience
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
    </section>
  );
}
