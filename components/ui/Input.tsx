'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-plugin-text-secondary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-plugin-bg border border-plugin-cyan/[0.12] rounded-plugin',
              'px-4 py-3 text-body text-plugin-text placeholder:text-plugin-text-secondary/50',
              'transition-all duration-300',
              'focus:outline-none focus:border-plugin-cyan/40 focus:shadow-plugin-glow-sm',
              'hover:border-plugin-cyan/25',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-10',
              error && 'border-plugin-danger/50 focus:border-plugin-danger focus:shadow-none',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-plugin-danger font-mono tracking-wide">
            ⚠ {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-plugin-text-secondary/60 font-mono">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
