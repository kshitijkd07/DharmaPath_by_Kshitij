import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface FeatureTileProps {
  icon: ReactNode;
  title: string;
  status: string;
  onClick?: () => void;
  className?: string;
}

export default function FeatureTile({ icon, title, status, onClick, className }: FeatureTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('spirit-tile p-4 text-left w-full', className)}
    >
      <div className="mb-3">{icon}</div>
      <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
      <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-0.5">
        {status} <ChevronRight className="w-3 h-3" />
      </p>
    </button>
  );
}
