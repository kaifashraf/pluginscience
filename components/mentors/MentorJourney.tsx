'use client';

import { motion } from 'framer-motion';
import { UserPlus, ShieldCheck, CalendarPlus, Presentation, Lightbulb, Trophy } from 'lucide-react';

export default function MentorJourney() {
  const steps = [
    {
      title: "Apply as Mentor",
      description: "Submit your application highlighting your expertise and passion for teaching.",
      icon: <UserPlus className="w-5 h-5 text-white" />,
      color: "bg-blue-500"
    },
    {
      title: "Profile Verification",
      description: "Our team reviews your credentials and aligns your skills with our workshop needs.",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      color: "bg-indigo-500"
    },
    {
      title: "Workshop Planning",
      description: "Collaborate with our curriculum designers to structure an engaging, hands-on session.",
      icon: <CalendarPlus className="w-5 h-5 text-white" />,
      color: "bg-purple-500"
    },
    {
      title: "Conduct Interactive Sessions",
      description: "Lead students through practical experiments, coding challenges, or creative builds.",
      icon: <Presentation className="w-5 h-5 text-white" />,
      color: "bg-pink-500"
    },
    {
      title: "Inspire Young Minds",
      description: "Watch your students transform curiosity into confidence as they build real projects.",
      icon: <Lightbulb className="w-5 h-5 text-white" />,
      color: "bg-[#F97316]" // Plug-in Orange
    },
    {
      title: "Become a Plug-in Ambassador",
      description: "Join our core team of educators and help shape the future of STEM learning globally.",
      icon: <Trophy className="w-5 h-5 text-white" />,
      color: "bg-amber-500"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-plugin max-w-4xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1121] mb-6 tracking-tight">
            The Mentor Journey
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            From your first application to becoming a recognized ambassador, here is how you grow with Plug-in.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-purple-500 to-[#F97316] rounded-full transform md:-translate-x-1/2 opacity-30" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center justify-between md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Empty space for desktop alternating layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: (index * 0.1) + 0.3 }}
                      className={`w-12 h-12 rounded-full ${step.color} shadow-lg shadow-${step.color}/40 flex items-center justify-center z-10 border-4 border-white`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full pl-20 md:pl-0 md:w-5/12 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`${step.color} p-6 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
                      <span className="text-sm font-bold text-white/70 mb-2 block">STEP 0{index + 1}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/90 font-light leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
