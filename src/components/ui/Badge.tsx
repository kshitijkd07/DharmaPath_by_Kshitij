import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export default function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'success' | 'muted';
  className?: string;
}) {
  const styles = {
    default: 'bg-[var(--accent-soft)] text-[var(--accent)]',
    gold: 'bg-gradient-to-r from-[#c9a227]/20 to-[#d4a853]/20 text-[#c9a227] dark:text-[#d4a853]',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    muted: 'bg-[var(--bg-glass)] text-[var(--text-muted)]',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
