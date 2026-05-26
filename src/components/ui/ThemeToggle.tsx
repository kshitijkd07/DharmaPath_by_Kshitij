import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  showLabels?: boolean;
  className?: string;
}

export default function ThemeToggle({ showLabels = false, className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      {showLabels && (
        <div className="text-left">
          <p className="text-sm font-medium text-[var(--text-primary)]">Appearance</p>
          <p className="text-xs text-[var(--text-muted)]">{isDark ? 'Dark mode' : 'Light mode'}</p>
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={!isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleTheme}
        className={`theme-toggle-track relative w-[52px] h-[30px] rounded-full shrink-0 ${isDark ? 'is-dark' : 'is-light'}`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          className="theme-toggle-thumb absolute top-[3px] w-[24px] h-[24px] rounded-full flex items-center justify-center shadow-md"
          style={{ left: isDark ? '3px' : '25px' }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-indigo-200" strokeWidth={2} />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-600" strokeWidth={2} />
          )}
        </motion.span>
      </button>
    </div>
  );
}
