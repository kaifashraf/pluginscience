'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, School, MapPin } from 'lucide-react';

export default function ContactInfo() {
  const contactCards = [
    {
      icon: <Mail className="w-8 h-8 text-blue-500" />,
      title: "Email",
      detail: "kaifashraf07@gmail.com",
      description: "For workshop inquiries, partnerships, mentoring, volunteering, and general support.",
      bgAccent: "bg-blue-50",
      borderAccent: "group-hover:border-blue-200"
    },
    {
      icon: <Phone className="w-8 h-8 text-green-500" />,
      title: "Phone",
      detail: "+91 92636 61030",
      description: "Monday – Saturday\n9:00 AM – 6:00 PM (IST)",
      bgAccent: "bg-green-50",
      borderAccent: "group-hover:border-green-200"
    },
    {
      icon: <School className="w-8 h-8 text-purple-500" />,
      title: "School Partnerships",
      detail: "Partner with Us",
      description: "Partner with Plug-in to organize engaging workshops and learning experiences for your students.",
      bgAccent: "bg-purple-50",
      borderAccent: "group-hover:border-purple-200"
    }
  ];

  return (
    <section id="contact-grid" className="py-24 bg-gray-50/50 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full mx-auto px-4 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1121] mb-4 tracking-tight">
            How Can We Help You?
          </h2>
          <p className="text-gray-500 font-light text-lg">
            Reach out to us through any of the channels below. We typically respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ${card.borderAccent}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${card.bgAccent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0B1121] mb-2">
                {card.title}
              </h3>
              <p className="text-[#F97316] font-semibold mb-4 text-sm md:text-base">
                {card.detail}
              </p>
              <p className="text-gray-500 font-light text-sm leading-relaxed whitespace-pre-line">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
