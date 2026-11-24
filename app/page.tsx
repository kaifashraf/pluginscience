import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HomeHero from '@/components/HomeHero';
import HomeDisciplines from '@/components/HomeDisciplines';
import './home.css';

const principles = [
  { title: 'Hands‑On First', desc: 'Every session is built around doing, not watching.' },
  { title: 'Expert‑Led', desc: 'Taught by engineers from premier institutions.' },
  { title: 'Real Hardware', desc: 'Students work with actual drones, circuits & code.' },
  { title: 'Open to All', desc: 'School students, college learners, and curious minds.' },
];

const rows = [
  {
    title: 'Students & Learners',
    desc: 'School or college: if you want to build real things and see how technology works, this is for you.',
    cta: 'Browse Workshops',
    href: '/products/workshops',
  },
  {
    title: 'Mentors & Experts',
    desc: 'Engineers, researchers and practitioners who want to give back join our network of mentors and facilitators.',
    cta: 'Apply to Mentor',
    href: '/mentors',
  },
];

export default function Home() {
  return (
    <div className="hm">
      <HomeHero />

      {/* Belief: the statement beside how a session works */}
      <section className="hm-belief" aria-labelledby="belief-title">
        <div className="hm-container hm-grid">
          <div className="hm-belief__head">
            <h2 id="belief-title">We do not teach technology.</h2>
            <p className="hm-lead">We awaken the builder within.</p>
          </div>
          <div className="hm-belief__body">
            <p>
              We run hands-on workshops across India for school and college students. Students go
              home with something they built themselves.
            </p>
            <dl className="hm-tenets">
              <div>
                <dt>Curiosity, Kindled.</dt>
                <dd>
                  Every session starts with a real question, one students actually care about
                  finding the answer to.
                </dd>
              </div>
              <div>
                <dt>Skills, Forged.</dt>
                <dd>
                  Students leave with the confidence that comes from having built something real,
                  no certificate can replicate that.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <HomeDisciplines />

      {/* Principles: four promises on the ink band */}
      <section className="hm-principles on-ink" aria-label="How every session runs">
        <div className="hm-container">
          <ul>
            {principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who should join: schools lead, students and mentors beside */}
      <section className="hm-who" aria-labelledby="who-title">
        <div className="hm-container hm-grid">
          <div className="hm-who__head">
            <h2 id="who-title">Who should join?</h2>
          </div>
          <div className="hm-who__lead on-ink">
            <h3>Schools & Institutions</h3>
            <div className="hm-who__foot">
              <p>
                Bring a live engineering workshop to your campus. We design, deliver, and manage
                everything, from materials to mentorship.
              </p>
              <Link href="/contact" className="hm-btn">
                Partner With Us
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hm-who__rows">
            {rows.map((r) => (
              <div key={r.title} className="hm-who__row">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <Link href={r.href} className="hm-link">
                  {r.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close: the hero's action again */}
      <section className="hm-close on-ink" aria-labelledby="close-title">
        <div className="hm-container hm-grid hm-close__inner">
          <h2 id="close-title">Your next build starts today.</h2>
          <div className="hm-close__action">
            <Link href="/products/workshops" className="hm-btn">
              View All Workshops
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
