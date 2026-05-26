/** Centralized motion presets — GPU-friendly, calm, cinematic */

export const spring = {
  gentle: { type: 'spring' as const, stiffness: 260, damping: 28 },
  snappy: { type: 'spring' as const, stiffness: 400, damping: 32 },
  soft: { type: 'spring' as const, stiffness: 180, damping: 24 },
};

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.45, 0, 0.55, 1] as const,
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.45, ease: ease.out },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: ease.out },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: spring.gentle,
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.out } },
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: ease.out },
};

export const tapScale = { whileTap: { scale: 0.97 }, transition: spring.snappy };
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.2 } },
};

export const breathePulse = {
  animate: {
    scale: [1, 1.03, 1],
    opacity: [0.5, 0.85, 0.5],
  },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};
