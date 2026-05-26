import { motion } from 'motion/react';

export default function MandalaOverlay() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] max-w-[900px] aspect-square opacity-[0.04] dark:opacity-[0.06] pointer-events-none text-[var(--accent)]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.15" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.15" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.15" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="5"
            x2="50"
            y2="95"
            stroke="currentColor"
            strokeWidth="0.08"
            transform={`rotate(${i * 15} 50 50)`}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={`c-${i}`}
            cx="50"
            cy="15"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.08"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </svg>
    </motion.div>
  );
}
