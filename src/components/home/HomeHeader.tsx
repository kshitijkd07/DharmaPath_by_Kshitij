import { motion } from 'motion/react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

function SunGlyph() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 sun-glyph-glow"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7">
        <circle cx="16" cy="16" r="6" fill="var(--accent)" opacity="0.9" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="16"
            y1="4"
            x2="16"
            y2="8"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${i * 45} 16 16)`}
            opacity="0.7"
          />
        ))}
      </svg>
    </motion.div>
  );
}

function LotusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[var(--accent)]" fill="currentColor">
      <path d="M8 2c-1 2-3 2-3 4s2 2 3 4c1-2 3-2 3-4s-2-2-3-4zm-5 6c-1 1-2 3 0 4 2-1 3-1 5-2 1-2-1-3-3-2-4 1-1 3-1 4-2zm10 0c1 1 2 3 0 4-2-1-3-1-5 2-1 2 1 3 3 2 4-1 1-3 1-4 2zM8 12c0 1-1 2-2 2h4c-1 0-2-1-2-2z" opacity="0.9" />
    </svg>
  );
}

export default function HomeHeader({
  greeting,
  dateLine,
  hasNotifications = true,
}: {
  greeting: string;
  dateLine: string;
  hasNotifications?: boolean;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-4 pt-5 pb-3"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <SunGlyph />
        <div className="min-w-0">
          <h1 className="font-display text-[22px] text-[var(--text-primary)] flex items-center gap-1.5 leading-tight">
            Dharma Path
            <LotusIcon />
          </h1>
          <p className="text-[12px] text-[var(--text-muted)] truncate">
            {greeting} · {dateLine}
          </p>
        </div>
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        className="relative w-11 h-11 rounded-2xl border border-[var(--border)] bg-[var(--bg-glass)] flex items-center justify-center shrink-0"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-[var(--text-secondary)]" strokeWidth={1.75} />
        {hasNotifications && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"
          />
        )}
      </motion.button>
    </motion.header>
  );
}

export function formatHomeDate(d: Date) {
  return format(d, 'EEE, d MMM');
}
