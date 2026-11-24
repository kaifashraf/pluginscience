import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HomeHero from '@/components/HomeHero';
import HomeDisciplines from '@/components/HomeDisciplines';
import './home.css';

const principles = [
  { title: 'Hands on', desc: 'You spend the session building, not watching someone else build.' },
  { title: 'Taught by researchers', desc: 'Led by engineers and researchers trained at places like BIT Mesra and IIT Kanpur.' },
  { title: 'Real parts', desc: 'Real motors, sensors, circuit boards and code in your hands.' },
  { title: 'Open to all', desc: 'School students, college students and anyone who likes taking things apart.' },
];

const rows = [
  {
    title: 'Students',
    desc: 'If you have ever opened something up just to see how it works, start here.',
    cta: 'Find a workshop',
    href: '/products/workshops',
  },
  {
    title: 'Engineers & researchers',
    desc: 'Know your field and enjoy explaining it? Teach a session or guide a student project with us.',
    cta: 'Apply to mentor',
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
            <h2 id="belief-title">Textbooks explain lift.</h2>
            <p className="hm-lead">We hand you the propellers.</p>
          </div>
          <div className="hm-belief__body">
            <p>
              We run hands-on workshops across India for school and college students. Everyone
              goes home with something they built and got working themselves.
            </p>
            <dl className="hm-tenets">
              <div>
                <dt>It starts with a question</dt>
                <dd>
                  Why does a drone tilt to turn? Each session opens with something students
                  actually want to know, and we build our way to the answer.
                </dd>
              </div>
              <div>
                <dt>It ends with something that works</dt>
                <dd>
                  A certificate says you attended. A circuit that lights up or a drone that holds
                  its height says you can do it.
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
            <h2 id="who-title">Who this is for</h2>
          </div>
          <div className="hm-who__lead on-ink">
            <h3>Schools & colleges</h3>
            <div className="hm-who__foot">
              <p>
                We bring the workshop to your campus: the kits, the tools and the instructors. You
                bring a room and a group of curious students.
              </p>
              <Link href="/contact" className="hm-btn">
                Host a workshop
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
          <h2 id="close-title">Come and build something.</h2>
          <div className="hm-close__action">
            <Link href="/products/workshops" className="hm-btn">
              See the workshops
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
