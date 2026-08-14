import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // We will manually control dark sections
  theme: {
    extend: {
      colors: {
        // Core Palette
        'plugin-light': '#F7F7F5',
        'plugin-dark': '#0D0E12',
        'plugin-surface': '#FFFFFF',
        'plugin-surface-dark': '#15171C',
        
        // Text
        'plugin-text': '#0D0E12',
        'plugin-text-muted': '#737373',
        'plugin-text-inverse': '#F7F7F5',
        'plugin-text-inverse-muted': '#A3A3A3',

        // Thematic Elements
        'theme-drone': '#0055FF', // Aerospace precision blue
        'theme-robotics': '#FF5500', // Industrial mechanical orange
        'theme-data': '#00E5FF', // Computational cyan
        'theme-community': '#FF3366', // Human-centric coral/pink
        'theme-hardware': '#10B981', // PCB green

        // Borders and UI
        'plugin-border': 'rgba(13, 14, 18, 0.1)',
        'plugin-border-dark': 'rgba(247, 247, 245, 0.1)',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'section': 'clamp(4rem, 8vw, 10rem)',
        'section-sm': 'clamp(2rem, 4vw, 5rem)',
      },
      maxWidth: {
        'content': '1600px', // Wider container for editorial feel
      },
      borderRadius: {
        'plugin': '2px', // Very subtle rounding for premium edge
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-right': 'revealRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw-line': 'drawLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-subtle': 'floatSubtle 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealRight: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
