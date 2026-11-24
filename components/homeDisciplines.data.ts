export type Discipline = {
  id: 'drone' | 'robotics' | 'data' | 'community';
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  cta: string;
};

export const disciplines: Discipline[] = [
  {
    id: 'drone',
    title: 'Aerospace & Drones',
    subtitle: 'From theory to the sky',
    desc: 'Build, calibrate, and fly. Master the science of aerodynamics, construct custom quadcopters and fixed wing aircraft, and program autonomous flight systems using real engineering tools.',
    href: '/products/workshops',
    cta: 'See the workshops',
  },
  {
    id: 'robotics',
    title: 'Robotics & Electronics',
    subtitle: 'Engineer the physical world',
    desc: 'Design and wire circuits, program microcontrollers, and bring mechanical systems to life. From basic electronics to advanced robotic arms, hands first, always.',
    href: '/products/workshops',
    cta: 'See the workshops',
  },
  {
    id: 'data',
    title: 'AI & Data Science',
    subtitle: 'Intelligence by design',
    desc: 'Train models, interpret data, and deploy intelligent systems. Work with computer vision, machine learning pipelines, and real world datasets to build software that thinks.',
    href: '/products/workshops',
    cta: 'See the workshops',
  },
  {
    id: 'community',
    title: 'Competitions & Events',
    subtitle: 'Prove your craft',
    desc: 'Hackathons, inter college drone races, science fairs, and innovation challenges. Compete, collaborate, and earn recognition alongside a network of ambitious builders.',
    href: '/contact',
    cta: 'Ask about events',
  },
];
