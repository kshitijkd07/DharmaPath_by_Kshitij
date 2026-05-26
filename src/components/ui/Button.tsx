import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { tapScale } from '../../motion/presets';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--text-primary)] text-[var(--bg-base)] shadow-[var(--shadow-soft)] hover:opacity-90',
  secondary:
    'bg-[var(--bg-glass)] text-[var(--text-primary)] border border-[var(--border)] backdrop-blur-md hover:bg-[var(--accent-soft)]',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)]',
  gold:
    'bg-gradient-to-r from-[#c9a227] to-[#d4a853] text-[#0a0f1f] font-semibold shadow-[var(--shadow-glow)] hover:opacity-95',
  danger: 'bg-rose-600/90 text-white hover:bg-rose-600',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3.5 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  icon,
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      {...tapScale}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        icon
      )}
      {children}
    </motion.button>
  );
}
