import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface QuickActionOrbProps {
  to?: string;
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  glowClass: string;
  delay?: number;
}

export default function QuickActionOrb({ to, onClick, icon, label, glowClass, delay = 0 }: QuickActionOrbProps) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.94 }}
      className="flex flex-col items-center gap-2 min-w-[72px]"
    >
      <div
        className={cn(
          'quick-action-orb w-[60px] h-[60px] rounded-full flex items-center justify-center',
          'border border-[var(--border)] bg-[var(--bg-tile)] shadow-lg',
          glowClass
        )}
      >
        {icon}
      </div>
      <span className="text-[11px] text-[var(--text-secondary)] text-center leading-tight max-w-[76px]">
        {label}
      </span>
    </motion.div>
  );

  if (to) {
    return <Link to={to} className="flex flex-col items-center">{inner}</Link>;
  }
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center">
      {inner}
    </button>
  );
}
