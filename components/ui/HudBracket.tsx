'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HudBracketProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  hoverOnly?: boolean;
}

export default function HudBracket({
  children,
  className,
  size = 16,
  strokeWidth = 1.5,
  color = 'rgba(0, 195, 255, 0.6)',
  hoverOnly = true,
}: HudBracketProps) {
  const cornerPath = (corner: 'tl' | 'tr' | 'bl' | 'br') => {
    switch (corner) {
      case 'tl': return `M 0 ${size} L 0 0 L ${size} 0`;
      case 'tr': return `M ${0} 0 L ${size} 0 L ${size} ${size}`;
      case 'bl': return `M 0 ${0} L 0 ${size} L ${size} ${size}`;
      case 'br': return `M 0 ${size} L ${size} ${size} L ${size} 0`;
    }
  };

  const corners: Array<'tl' | 'tr' | 'bl' | 'br'> = ['tl', 'tr', 'bl', 'br'];

  const cornerPositions = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  };

  return (
    <motion.div
      className={cn('relative group', className)}
      whileHover="hover"
    >
      {corners.map((corner) => (
        <svg
          key={corner}
          className={cn('absolute pointer-events-none z-10', cornerPositions[corner])}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d={cornerPath(corner)}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            initial={{ pathLength: hoverOnly ? 0 : 1, opacity: hoverOnly ? 0 : 0.6 }}
            variants={{
              hover: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.3, ease: 'easeOut' },
              },
            }}
          />
        </svg>
      ))}
      {children}
    </motion.div>
  );
}
