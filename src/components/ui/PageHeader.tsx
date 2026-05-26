import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export default function PageHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'sticky top-0 z-20 px-4 pt-6 pb-4 -mx-4 px-4',
        'bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border)]',
        className
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--text-muted)] mt-1">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
