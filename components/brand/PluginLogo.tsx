'use client';

import { motion } from 'framer-motion';

/*
 * PluginLogo — Brand Identity Component
 *
 * The icon concept: Two rounded geometric shapes that connect together,
 * forming a subtle "P" in negative space. The left arc and right arc
 * move toward each other and join — symbolizing "plugging in",
 * connection, community, and technology.
 *
 * Variants:
 *   - full:      [ICON] pluginscience  (horizontal combination mark)
 *   - icon:      [ICON]         (standalone icon/favicon)
 *   - wordmark:  pluginscience         (wordmark only)
 *
 * Themes:
 *   - dark:  dark mark on light/transparent backgrounds
 *   - light: white mark for dark backgrounds
 *
 * Animation:
 *   Two arcs start separated → smoothly connect → wordmark fades in
 *   → subtle blue glow pulse → settles. ~1.2 seconds total.
 */

// ─── Brand Colors ────────────────────────────────────────────────────
const BRAND = {
  navy:     '#0B1121',
  blue:     '#2563EB',
  cyan:     '#06B6D4',
  white:    '#FFFFFF',
  gradient: 'url(#pluginscience-gradient)',
};

// ─── Types ───────────────────────────────────────────────────────────
export interface PluginLogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  showGlow?: boolean;
}

// ─── Size Map ────────────────────────────────────────────────────────
const sizeMap = {
  xs: { icon: 20, fontSize: '0.75rem',  gap: 4,  wordmarkWidth: 48 },
  sm: { icon: 26, fontSize: '0.9rem',   gap: 6,  wordmarkWidth: 60 },
  md: { icon: 32, fontSize: '1.1rem',   gap: 8,  wordmarkWidth: 72 },
  lg: { icon: 42, fontSize: '1.45rem',  gap: 10, wordmarkWidth: 96 },
  xl: { icon: 56, fontSize: '1.9rem',   gap: 14, wordmarkWidth: 130 },
};

// ─── Logo Icon (SVG Mark) ────────────────────────────────────────────
function PluginMark({
  size,
  theme,
  animated = false,
}: {
  size: number;
  theme: 'dark' | 'light';
  animated?: boolean;
}) {
  const color = theme === 'dark' ? '#334155' : '#FFFFFF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {/* U-Shape Receptacle (Socket) */}
      <path
        d="M 32 14 L 42 14 A 18 18 0 0 1 42 50 L 32 50"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* The Plug - Animates smoothly to plug into the socket */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 4 0; 0 0"
            dur="2.5s"
            repeatCount="indefinite"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        )}
        
        {/* Plug Tip (Metal) - Drawn behind body */}
        <rect
          x="24" y="22"
          width="14" height="20"
          fill={theme === 'dark' ? 'white' : '#1E293B'}
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Orange Pins */}
        <rect x="29.5" y="27" width="3" height="3" fill="#F97316" />
        <rect x="29.5" y="34" width="3" height="3" fill="#F97316" />

        {/* Cord stub */}
        <rect x="6" y="28" width="6" height="8" fill={color} />

        {/* Plug Body (Switch) - Thinner width as requested */}
        <rect x="12" y="16" width="12" height="32" rx="4" fill={color} />
      </g>
    </svg>
  );
}

// ─── Wordmark (Custom SVG Typography) ────────────────────────────────
function PluginWordmark({
  theme,
  fontSize,
  animated = false,
}: {
  theme: 'dark' | 'light';
  fontSize: string;
  animated?: boolean;
}) {
  const color = theme === 'dark' ? '#334155' : '#FFFFFF';

  return (
    <motion.span
      className="font-sans font-bold tracking-[0.06em] select-none whitespace-nowrap"
      style={{
        fontSize,
        color,
        letterSpacing: '0.06em',
        fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif",
        fontWeight: 700,
      }}
      initial={animated ? { opacity: 0, x: -8 } : false}
      animate={animated ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      pluginscience
    </motion.span>
  );
}

// ─── Main Exported Component ─────────────────────────────────────────
export default function PluginLogo({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  animated = true,
  className = '',
}: PluginLogoProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap: `${s.gap}px` }}
    >
      {/* Icon */}
      {variant !== 'wordmark' && (
        <PluginMark size={s.icon} theme={theme} animated={animated} />
      )}

      {/* Wordmark */}
      {variant !== 'icon' && (
        <PluginWordmark theme={theme} fontSize={s.fontSize} animated={animated} />
      )}
    </div>
  );
}

// ─── Favicon Component (static, optimized) ───────────────────────────
export function PluginFavicon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 36 12 L 48 12 A 20 20 0 0 1 48 52 L 36 52" stroke="#334155" strokeWidth="8" strokeLinecap="round" fill="none" />
      <rect x="12" y="28" width="6" height="8" fill="#334155" />
      <rect x="18" y="20" width="16" height="24" rx="4" fill="#334155" />
      <rect x="34" y="24" width="10" height="16" fill="white" stroke="#334155" strokeWidth="4" strokeLinejoin="round" />
      <rect x="38" y="27" width="2.5" height="2.5" fill="#F97316" />
      <rect x="38" y="34.5" width="2.5" height="2.5" fill="#F97316" />
    </svg>
  );
}
