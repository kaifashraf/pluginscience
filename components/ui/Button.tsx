'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className, disabled, ...props }, ref) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-medium tracking-wide uppercase transition-all duration-300 rounded-plugin focus:outline-none focus:ring-2 focus:ring-plugin-cyan/40 focus:ring-offset-2 focus:ring-offset-plugin-bg disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-plugin-cyan text-plugin-bg hover:bg-plugin-cyan-bright hover:shadow-plugin-cyan active:bg-plugin-cyan/90',
      secondary: 'bg-plugin-steel text-plugin-text hover:bg-plugin-steel/80 border border-plugin-cyan/20 hover:border-plugin-cyan/40',
      ghost: 'bg-transparent text-plugin-cyan hover:bg-plugin-cyan/10 border border-plugin-cyan/20 hover:border-plugin-cyan/40',
      danger: 'bg-plugin-danger/10 text-plugin-danger hover:bg-plugin-danger/20 border border-plugin-danger/30',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
