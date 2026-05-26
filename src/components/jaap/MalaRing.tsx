import { motion } from 'motion/react';
import { breathePulse } from '../../motion/presets';

interface MalaRingProps {
  count: number;
  goal: number;
  onTap: () => void;
  focusMode?: boolean;
}

export default function MalaRing({ count, goal, onTap, focusMode }: MalaRingProps) {
  const progress = Math.min((count / goal) * 100, 100);
  const totalBeads = 108;
  const activeBeads = Math.floor((count / goal) * totalBeads);
  const circumference = 2 * Math.PI * 45;

  return (
    <motion.button
      onClick={onTap}
      className="relative w-[min(85vw,320px)] aspect-square flex items-center justify-center rounded-full focus:outline-none gpu"
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {focusMode && (
        <motion.div
          className="absolute inset-[-8%] rounded-full border border-[var(--accent)]/30"
          {...breathePulse}
        />
      )}

      <motion.div
        className="absolute inset-[8%] rounded-full bg-[var(--accent)]/10 blur-2xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="1.5" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#d4a853" />
          </linearGradient>
        </defs>
        {Array.from({ length: totalBeads }).map((_, i) => {
          const angle = (i / totalBeads) * Math.PI * 2;
          const x = 50 + 45 * Math.cos(angle);
          const y = 50 + 45 * Math.sin(angle);
          const isActive = i < activeBeads;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={isActive ? 2.2 : 1.4}
              fill={isActive ? '#d4a853' : 'var(--text-muted)'}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0.35 }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
        <circle cx="50" cy="5" r="3.5" fill="#b8860b" />
      </svg>

      <div className="relative z-10 w-[58%] aspect-square rounded-full bg-[var(--bg-elevated)] backdrop-blur-xl border border-[var(--border)] shadow-[var(--shadow-glow)] flex flex-col items-center justify-center">
        <motion.span
          key={count}
          initial={{ scale: 1.15, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-display text-5xl md:text-6xl text-[var(--text-primary)] tabular-nums"
        >
          {count}
        </motion.span>
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mt-2">
          Tap · Count
        </span>
      </div>
    </motion.button>
  );
}
