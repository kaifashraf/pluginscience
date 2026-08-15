import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Ecosystem: [
    { label: 'Hardware Store', href: '/products/hardware' },
    { label: 'Software', href: '/products/software' },
    { label: 'Events', href: '/community/events' },
  ],
  Company: [
    { label: 'About PluginScience', href: '/about' },
    { label: 'Apply as Mentor', href: '/apply-mentor' },
    { label: 'Apply for Volunteering', href: '/volunteer' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Shipping & Returns', href: '/shipping' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-plugin-dark text-plugin-text-inverse pt-32 pb-12 relative overflow-hidden">
      {/* Subtle Technical Background */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-10 pointer-events-none" />

      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-12">
                <div className="text-4xl font-display font-bold tracking-tighter text-plugin-light">
                  PLUGIN<span className="text-theme-drone">.</span>
                </div>
              </Link>
              <h3 className="text-2xl font-light leading-snug max-w-md text-plugin-text-inverse mb-8">
                Where innovation meets education. Building the future of technology, together.
              </h3>
            </div>
            
            <div className="hidden lg:block">
              <p className="text-sm text-plugin-text-inverse-muted font-display font-light">
                Engineering the Future.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-display font-medium text-plugin-light mb-6">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-plugin-text-inverse hover:text-theme-data transition-colors duration-300 flex items-center gap-2 group text-sm"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-plugin-border-dark pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-plugin-text-inverse-muted tracking-wide">
            © {new Date().getFullYear()} PluginScience Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm font-display text-plugin-text-inverse-muted">
            <a href="#" className="hover:text-plugin-light transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-plugin-light transition-colors">Twitter</a>
            <a href="#" className="hover:text-plugin-light transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
