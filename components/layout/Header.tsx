'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const SearchModal = dynamic(() => import('@/components/SearchModal'), { ssr: false });

const navLinks = [
  { label: 'Home', href: '/' },
  { 
    label: 'Workshops', 
    href: '#',
    dropdown: [
      { label: 'Aerospace & Drones', href: '/products/workshops' },
      { label: 'Robotics & Electronics', href: '/products/workshops' },
      { label: 'AI & Data Science', href: '/products/workshops' },
    ]
  },
  { label: 'Mentor/Advisor', href: '/mentors' },
  { label: 'Contact', href: '/contact' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On dark hero (not scrolled) → white text. On scroll → light bg + dark text.
  // If mobile menu is open, force dark text colors to match the dark menu bg.
  const isLight = scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
          mobileMenuOpen
            ? 'bg-[#0D0D0D] py-4'
            : isLight
              ? 'bg-[#F5F3EF]/95 backdrop-blur-xl border-b border-black/8 py-4'
              : 'bg-transparent py-7'
        )}
      >
        <div className="container-fluid">
          <div className="flex items-center justify-between w-full">

            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <span
                className={cn(
                  'font-display font-medium tracking-tight transition-colors duration-500 leading-none',
                  isLight ? 'text-[#0A0A0A]' : 'text-white',
                )}
                style={{ fontSize: '1.6rem' }}
              >
                PluginScience
                <span className={cn('transition-colors duration-500', isLight ? 'text-theme-drone' : 'text-theme-drone')}>.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 text-sm font-sans font-medium tracking-wide transition-colors duration-300 relative',
                      isLight
                        ? 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    <span className={cn(
                      'absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-400',
                      isLight ? 'bg-[#0A0A0A]' : 'bg-white'
                    )} />
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div className="absolute top-full left-0 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className={cn(
                        'min-w-[200px] py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border backdrop-blur-xl overflow-hidden',
                        isLight ? 'bg-white border-gray-100' : 'bg-[#151515] border-white/10'
                      )}>
                        {link.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.label}
                            href={dropItem.href}
                            className={cn(
                              'block px-5 py-2.5 text-sm font-medium transition-colors',
                              isLight ? 'text-gray-600 hover:text-black hover:bg-gray-50' : 'text-gray-400 hover:text-white hover:bg-white/5'
                            )}
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-5">

              {/* Contact CTA */}
              <Link
                href="/contact"
                className={cn(
                  'hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium tracking-wide border transition-all duration-300',
                  isLight
                    ? 'border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                    : 'border-white/50 text-white hover:bg-white hover:text-[#0A0A0A]'
                )}
              >
                Get in Touch
              </Link>

              {/* Mobile hamburger */}
              <button
                className={cn(
                  'lg:hidden p-2 transition-colors duration-300',
                  (isLight && !mobileMenuOpen) ? 'text-[#0A0A0A]' : 'text-[#EDE6D6]'
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-y-auto bg-[#0D0D0D] fixed top-[68px] left-0 right-0 bottom-0 z-40 px-6 pb-12 flex flex-col"
            >
              <nav className="flex flex-col flex-grow pt-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-[#EDE6D6]/10 last:border-none"
                  >
                    {link.dropdown ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label);
                        }}
                        className="w-full text-left flex items-center justify-between py-6 text-4xl sm:text-5xl font-display font-light tracking-tight transition-colors text-[#EDE6D6] hover:text-[#3A5FCD]"
                      >
                        {link.label}
                        <ChevronDown className={cn(
                          "w-6 h-6 transition-transform duration-400", 
                          mobileDropdownOpen === link.label ? "rotate-180 text-[#3A5FCD]" : "text-[#EDE6D6]/30"
                        )} />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-6 text-4xl sm:text-5xl font-display font-light tracking-tight transition-colors text-[#EDE6D6] hover:text-[#3A5FCD]"
                      >
                        {link.label}
                      </Link>
                    )}
                    
                    {link.dropdown && (
                      <AnimatePresence>
                        {mobileDropdownOpen === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pl-4 pb-8">
                              {link.dropdown.map((dropItem) => (
                                <Link
                                  key={dropItem.label}
                                  href={dropItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-lg font-sans font-light tracking-wide text-[#EDE6D6]/60 hover:text-[#EDE6D6] transition-colors"
                                >
                                  {dropItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </nav>
                
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-12 flex flex-col gap-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-4 bg-[#3A5FCD] text-[#EDE6D6] text-sm font-sans font-medium tracking-wide rounded-sm hover:bg-[#3A5FCD]/90 transition-colors shadow-lg shadow-[#3A5FCD]/20"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/mentors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-[11px] font-sans uppercase tracking-[0.2em] text-[#EDE6D6]/50 hover:text-[#EDE6D6] transition-colors"
                >
                  Apply as Mentor
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
