'use client';

import { motion } from 'framer-motion';
import { Star, Brain, Users, Rocket } from 'lucide-react';

export default function WhyLearn() {
  const features = [
    {
      icon: <Star className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-50",
      title: "Industry & Academic Excellence",
      description: "Learn directly from experienced professionals and researchers from leading institutions around the world."
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-50",
      title: "Hands-on Learning",
      description: "Every mentor believes true learning happens through building, experimenting, failing, and creating."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50",
      title: "Personalized Guidance",
      description: "Interactive, small-batch sessions ensure you get direct mentorship, feedback, and collaborative learning."
    },
    {
      icon: <Rocket className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-50",
      title: "Future-Ready Skills",
      description: "Gain the practical, real-world knowledge and unshakeable confidence needed for tomorrow's opportunities."
    }
  ];

  return (
    <section className="py-24 bg-plugin-surface">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6"
          >
            <span className="text-sm font-bold text-[#F97316] tracking-widest uppercase">The PluginScience Difference</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0B1121] mb-6 tracking-tight"
          >
            Why Learn From Our Mentors?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0B1121] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
