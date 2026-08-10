'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function MentorTestimonials() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      title: 'Senior Software Engineer at TechCorp',
      quote: "Mentoring here helped me expand my network while earning additional income. The platform handles all the scheduling and payments seamlessly, letting me focus entirely on teaching.",
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'David Chen',
      title: 'Product Design Lead',
      quote: "I've been a mentor for over a year now. Watching my students land their dream jobs after taking my workshops has been the most rewarding experience of my entire career.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Elena Rodriguez',
      title: 'Aerospace Systems Engineer',
      quote: "The flexibility is unmatched. I can set my availability week-by-week depending on my full-time job's demands, and the students here are incredibly driven and passionate.",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="container-plugin max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#0B1121] mb-6 tracking-tight"
          >
            Hear from Our Mentors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-light max-w-2xl mx-auto"
          >
            Join hundreds of industry professionals who are already making a difference.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FF7A00] fill-[#FF7A00]" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-8">
                  "{test.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={test.image} alt={test.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1121]">{test.name}</h4>
                  <p className="text-sm text-gray-500">{test.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
