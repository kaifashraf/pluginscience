'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, DollarSign, Award } from 'lucide-react';

export default function WhyBecomeMentor() {
  const cards = [
    {
      icon: <BookOpen className="w-8 h-8 text-[#FF7A00]" />,
      title: 'Share Your Knowledge',
      description: 'Help students achieve their goals by sharing your industry experience and insights.'
    },
    {
      icon: <Clock className="w-8 h-8 text-[#FF7A00]" />,
      title: 'Flexible Schedule',
      description: "Mentor whenever you're available. You control your calendar and hours completely."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-[#FF7A00]" />,
      title: 'Earn Income or Volunteer',
      description: 'Generate income or volunteer your time to share your knowledge with ambitious students.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#FF7A00]" />,
      title: 'Build Your Reputation',
      description: 'Become a recognized industry expert and expand your professional network globally.'
    }
  ];

  return (
    <section id="why-mentor" className="py-24 bg-gray-50 relative">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-[#0B1121] mb-6 tracking-tight"
          >
            Why Become a Mentor?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 font-light"
          >
            Join a community of top-tier professionals who are shaping the future while building their own careers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all group"
            >
              <div className="w-16 h-16 bg-[#FF7A00]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF7A00]/20 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0B1121] mb-3">{card.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
