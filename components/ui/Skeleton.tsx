import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const variants = {
    text: 'rounded-plugin h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-plugin',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-plugin-surface',
        'bg-gradient-to-r from-plugin-surface via-plugin-bg-secondary to-plugin-surface',
        'bg-[length:200%_100%]',
        variants[variant],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        animation: 'shimmer 2s ease-in-out infinite',
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="plugin-card p-4 space-y-4">
      <Skeleton variant="rectangular" className="w-full h-48" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-16 h-6" />
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
