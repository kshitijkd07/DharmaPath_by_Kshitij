import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'motion/react';

const LottiePlayer = lazy(() =>
  import('lottie-react').then((m) => ({ default: m.default }))
);

const minimalPulse = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 120,
  h: 120,
  nm: 'pulse',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'circle',
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [40] }, { t: 30, s: [100] }, { t: 60, s: [40] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [{ t: 0, s: [80, 80, 100] }, { t: 30, s: [100, 100, 100] }, { t: 60, s: [80, 80, 100] }],
        },
      },
      shapes: [
        { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } },
        { ty: 'fl', c: { a: 0, k: [0.83, 0.66, 0.33, 1] }, o: { a: 0, k: 100 } },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

const phases = [
  'Mapping life lines...',
  'Reading heart energy...',
  'Aligning with Vedic wisdom...',
  'Channeling cosmic insight...',
];

function PhaseRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phases.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.p
      key={idx}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm text-[var(--text-muted)] mt-2"
    >
      {phases[idx]}
    </motion.p>
  );
}

export default function AnalysisLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] backdrop-blur-xl p-8 text-center"
    >
      <div className="w-24 h-24 mx-auto mb-6 relative">
        <Suspense
          fallback={
            <div className="w-full h-full rounded-full border-2 border-[var(--accent)]/30 border-t-[var(--accent)] animate-spin" />
          }
        >
          <LottiePlayer animationData={minimalPulse} loop className="w-full h-full" />
        </Suspense>
        <motion.div
          className="absolute inset-0 rounded-full border border-[var(--accent)]/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <p className="font-display text-lg text-[var(--text-primary)]">Connecting with cosmic energies</p>
      <PhaseRotator />
    </motion.div>
  );
}
