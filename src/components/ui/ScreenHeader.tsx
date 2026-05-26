import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ScreenHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex justify-between items-start px-4 pt-5 pb-4">
      <div>
        <h1 className="font-display text-[26px] text-[var(--text-primary)] flex items-center gap-2 leading-tight">
          {title}
          <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" strokeWidth={1.5} />
        </h1>
        {subtitle && (
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </header>
  );
}
