import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Sparkles, BookOpen, User } from 'lucide-react';
import { cn } from '../lib/utils';

function JaapNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={active ? 'var(--accent)' : 'var(--text-muted)'}
        strokeWidth="1.5"
        strokeDasharray={active ? '4 3' : '0'}
        className={active ? 'nav-jaap-active' : undefined}
      />
      <circle cx="12" cy="12" r="2.5" fill={active ? 'var(--accent)' : 'var(--text-muted)'} />
    </svg>
  );
}

type NavItem = {
  to: string;
  label: string;
  icon?: typeof Home;
  customIcon?: 'jaap' | 'astro';
};

const navItems: NavItem[] = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/jaap', label: 'Jaap', customIcon: 'jaap' },
  { to: '/palm-reading', icon: Sparkles, label: 'Astro', customIcon: 'astro' },
  { to: '/puja', icon: BookOpen, label: 'Puja' },
  { to: '/profile', icon: User, label: 'Profile' },
];

function isNavActive(pathname: string, to: string) {
  return pathname === to || (to !== '/home' && pathname.startsWith(to + '/'));
}

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto relative overflow-hidden bg-[var(--bg-base)]">
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[76px] scrollbar-hide">
        <Outlet />
      </main>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 app-bottom-nav safe-pb"
        aria-label="Main navigation"
      >
        <div className="flex items-stretch justify-between px-1 pt-2 pb-1">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.to);
            const isAstro = item.customIcon === 'astro';

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center gap-1 py-1.5 min-w-0',
                  'transition-colors duration-200'
                )}
              >
                <span
                  className={cn(
                    'nav-icon-slot flex items-center justify-center w-10 h-10 rounded-xl transition-all',
                    active && !isAstro && 'nav-icon-active',
                    active && isAstro && 'nav-icon-astro-active'
                  )}
                >
                  {item.customIcon === 'jaap' ? (
                    <JaapNavIcon active={active} />
                  ) : item.icon ? (
                    <item.icon
                      className={cn(
                        'w-6 h-6',
                        active
                          ? isAstro
                            ? 'text-[var(--purple-accent)]'
                            : 'text-[var(--accent)]'
                          : 'text-[var(--text-muted)]'
                      )}
                      strokeWidth={1.75}
                    />
                  ) : null}
                </span>
                <span
                  className={cn(
                    'text-[10px] leading-none truncate max-w-full px-0.5',
                    active
                      ? isAstro
                        ? 'text-[var(--purple-accent)] font-semibold'
                        : 'gold-text font-medium'
                      : 'text-[var(--text-muted)]'
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
