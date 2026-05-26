import { motion, AnimatePresence } from 'motion/react';
import { scaleIn } from '../../motion/presets';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            {...scaleIn}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] backdrop-blur-xl p-6 shadow-[var(--shadow-soft)] text-center"
          >
            {title && <h3 className="font-display text-2xl text-[var(--text-primary)] mb-2">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
