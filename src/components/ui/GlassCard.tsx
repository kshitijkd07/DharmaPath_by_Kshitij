import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { hoverLift } from '../../motion/presets';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, interactive, glow, onClick }: GlassCardProps) {
  const Comp = interactive || onClick ? motion.div : motion.div;

  return (
    <Comp
      {...(interactive ? hoverLift : {})}
      onClick={onClick}
      className={cn(
        'rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] backdrop-blur-xl shadow-[var(--shadow-soft)]',
        glow && 'ring-1 ring-[var(--accent-soft)]',
        (interactive || onClick) && 'cursor-pointer transition-shadow hover:shadow-[var(--shadow-glow)]',
        className
      )}
    >
      {children}
    </Comp>
  );
}
