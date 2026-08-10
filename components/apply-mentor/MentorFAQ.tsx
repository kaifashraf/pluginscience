'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function MentorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Who can become a mentor?',
      answer: 'Professionals with at least 2 years of experience OR passionate student volunteers looking to increase their knowledge by sharing. We look for individuals with strong communication skills and a desire to help others grow.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Our standard review process takes between 3 to 5 business days. Once your application is reviewed, we will schedule a brief 15-minute video interview before final verification.'
    },
    {
      question: 'Is mentoring paid?',
      answer: 'You can choose! Professionals can set their own hourly rate and get compensated for their time. Students can also join as volunteer mentors to increase their knowledge by sharing.'
    },
    {
      question: 'Can I mentor remotely?',
      answer: 'Absolutely. 100% of our mentoring sessions are conducted online via our integrated video platform. You can mentor students from anywhere in the world.'
    },
    {
      question: 'How are payments processed?',
      answer: 'Payments are processed securely via Stripe. Earnings from your sessions are transferred directly to your connected bank account on a bi-weekly basis.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-plugin max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#0B1121] mb-6 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-light"
          >
            Everything you need to know about the mentor program.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'border-[#FF7A00]/30 bg-orange-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-[#FF7A00]' : 'text-[#0B1121]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#FF7A00]/10 text-[#FF7A00]' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
