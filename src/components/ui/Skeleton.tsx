import { cn } from '../../lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('rounded-2xl skeleton-shimmer', className)} />;
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <div className="w-16 h-16 rounded-full skeleton-shimmer animate-breathe" />
      <div className="w-32 h-3 rounded-full skeleton-shimmer" />
      <p className="text-sm text-[var(--text-muted)] font-display text-lg tracking-wide">Awakening...</p>
    </div>
  );
}
