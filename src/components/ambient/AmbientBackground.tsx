import { motion } from 'motion/react';
import SacredParticles from './SacredParticles';
import MandalaOverlay from './MandalaOverlay';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[var(--bg-base)]" aria-hidden>
      <div className="absolute inset-0 ambient-gradient-top" />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] rounded-full blur-3xl"
        style={{ background: 'var(--gradient-ambient-1)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-0 right-0 w-[60vw] h-[40vh] rounded-full blur-3xl opacity-50"
        style={{ background: 'var(--gradient-ambient-2)' }}
      />
      <MandalaOverlay />
      <SacredParticles count={18} />
    </div>
  );
}
