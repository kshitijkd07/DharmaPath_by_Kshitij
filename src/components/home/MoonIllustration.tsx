import { motion } from 'motion/react';

export default function MoonIllustration({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10 blur-xl scale-110" />
      <svg viewBox="0 0 120 120" className="w-full h-full relative z-10">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe9a8" />
            <stop offset="55%" stopColor="#e8b84a" />
            <stop offset="100%" stopColor="#9a7b2e" />
          </radialGradient>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a3548" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#141820" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(232,184,74,0.15)" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="60"
            y1="8"
            x2="60"
            y2="112"
            stroke="rgba(232,184,74,0.08)"
            strokeWidth="0.5"
            transform={`rotate(${i * 22.5} 60 60)`}
          />
        ))}
        <ellipse cx="60" cy="78" rx="38" ry="14" fill="url(#cloudGrad)" />
        <ellipse cx="42" cy="82" rx="18" ry="10" fill="#1a2230" opacity="0.8" />
        <ellipse cx="78" cy="80" rx="20" ry="11" fill="#1a2230" opacity="0.7" />
        <path
          d="M 75 35 A 32 32 0 1 1 45 55 A 26 26 0 1 0 75 35"
          fill="url(#moonGlow)"
          filter="drop-shadow(0 0 12px rgba(255,214,90,0.4))"
        />
        <circle cx="28" cy="28" r="1.2" fill="#fff" opacity="0.8" />
        <circle cx="88" cy="22" r="1" fill="#fff" opacity="0.6" />
        <circle cx="95" cy="45" r="0.8" fill="#fff" opacity="0.5" />
        <circle cx="22" cy="48" r="0.9" fill="#fff" opacity="0.55" />
      </svg>
    </motion.div>
  );
}
