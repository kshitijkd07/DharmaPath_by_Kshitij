import { motion } from 'motion/react';
import { pageTransition } from './presets';

export default function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div {...pageTransition} className={className}>
      {children}
    </motion.div>
  );
}
