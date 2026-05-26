import type { ReactNode } from 'react';

export interface StatItem {
  icon: ReactNode;
  label: string;
  value: string | number;
}

export default function StatsRow({ items }: { items: StatItem[] }) {
  return (
    <div className="spirit-card flex items-stretch overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex-1 flex flex-col items-center justify-center py-4 px-2 ${
            i < items.length - 1 ? 'border-r border-[var(--border)]' : ''
          }`}
        >
          <div className="mb-2">{item.icon}</div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide text-center">
            {item.label}
          </span>
          <span className="text-lg font-semibold text-[var(--text-primary)] mt-1 tabular-nums">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
