import { motion } from 'motion/react';

export default function ScanOverlay({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <motion.div
        className="absolute left-0 right-0 h-0.5 z-10"
        style={{
          background: 'linear-gradient(90deg, transparent, #d4a853, #7c9ee8, transparent)',
          boxShadow: '0 0 20px 4px rgba(212, 168, 83, 0.5)',
        }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d4a7c]/20 via-transparent to-[#c9a227]/10" />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-[var(--accent)]/40"
          style={{ left: `${15 + i * 14}%`, top: 0, bottom: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
