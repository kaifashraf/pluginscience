export type Discipline = {
  id: 'drone' | 'robotics' | 'data' | 'community';
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  cta: string;
  alt: string;
};

export const disciplines: Discipline[] = [
  {
    id: 'drone',
    title: 'Aerospace & Drones',
    subtitle: 'Quadcopters, fixed wings, flight code',
    desc: 'You put a quadcopter together from parts, tune its flight controller and find out why it stays in the air. Later sessions move on to fixed wing aircraft and code that flies the drone for you.',
    href: '/products/workshops',
    cta: 'See the drone workshops',
    alt: 'Hands wiring the flight board of a quadcopter',
  },
  {
    id: 'robotics',
    title: 'Robotics & Electronics',
    subtitle: 'Circuits, microcontrollers, robot arms',
    desc: 'Start with a breadboard and a blinking LED. Move on to microcontrollers, sensors and motors, and finish with a robotic arm that does exactly what you programmed it to do.',
    href: '/products/workshops',
    cta: 'See the robotics workshops',
    alt: 'A student in safety glasses building a small wheeled robot',
  },
  {
    id: 'data',
    title: 'AI & Data Science',
    subtitle: 'Computer vision, machine learning, real data',
    desc: 'Collect real data, train a model and put it to work. Students build camera projects that spot and follow objects, and learn how to tell when a model has got it wrong.',
    href: '/products/workshops',
    cta: 'See the AI workshops',
    alt: 'A tablet showing a block-coding program and a chart',
  },
  {
    id: 'community',
    title: 'Competitions & Events',
    subtitle: 'Hackathons, drone races, science fairs',
    desc: 'Hackathons, inter-college drone races, science fairs and innovation challenges. A deadline and a scoreboard teach you things a classroom never will.',
    href: '/contact',
    cta: 'Ask about upcoming events',
    alt: 'Students high-fiving across a lab bench',
  },
];
