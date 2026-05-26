import { motion } from 'motion/react';

interface JaapProgressRingProps {
  count: number;
  goal: number;
  malaIndex: number;
  malaTotal: number;
  onTap?: () => void;
}

export default function JaapProgressRing({
  count,
  goal,
  malaIndex,
  malaTotal,
  onTap,
}: JaapProgressRingProps) {
  const progress = Math.min(count / goal, 1);
  const r = 88;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - progress * circumference;
  const dotAngle = progress * 360 - 90;
  const dotX = 100 + r * Math.cos((dotAngle * Math.PI) / 180);
  const dotY = 100 + r * Math.sin((dotAngle * Math.PI) / 180);

  const Wrapper = onTap ? motion.button : motion.div;

  return (
    <Wrapper
      type={onTap ? 'button' : undefined}
      onClick={onTap}
      className="relative w-[min(78vw,300px)] aspect-square mx-auto flex items-center justify-center gpu focus:outline-none"
      whileTap={onTap ? { scale: 0.98 } : undefined}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="var(--border)" strokeWidth="2" opacity="0.5" />
        <circle cx="100" cy="100" r={r - 12} fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.35" />
        <motion.circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#jaapGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', stiffness: 90, damping: 22 }}
        />
        <defs>
          <linearGradient id="jaapGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#ffe066" />
          </linearGradient>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[#ffe066] shadow-[0_0_16px_var(--accent-glow)]"
        style={{
          left: `${(dotX / 200) * 100}%`,
          top: `${(dotY / 200) * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.span
          key={count}
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-semibold text-[var(--text-primary)] tabular-nums leading-none"
        >
          {count}
        </motion.span>
        <span className="text-lg text-[var(--text-muted)] mt-1 tabular-nums">/ {goal}</span>
        <div className="w-8 h-px bg-[var(--accent)]/50 my-2" />
        <span className="text-xs text-[var(--text-muted)]">
          Mala {malaIndex} of {malaTotal}
        </span>
      </div>
    </Wrapper>
  );
}
