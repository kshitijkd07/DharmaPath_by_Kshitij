import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Target,
  CalendarDays,
  Sun,
  Moon,
  Star,
  Flower2,
  Flame,
  Orbit,
} from 'lucide-react';
import HomeHeader, { formatHomeDate } from '../components/home/HomeHeader';
import MoonIllustration from '../components/home/MoonIllustration';
import QuickActionOrb from '../components/home/QuickActionOrb';
import { useJaapStorage } from '../hooks/useJaapStorage';
import { useUserProfile } from '../hooks/useUserProfile';
import { staggerContainer, staggerItem } from '../motion/presets';

const panchang = {
  tithi: 'Shukla Paksha Ekadashi',
  tithiShort: 'Ekadashi',
  paksha: 'Shukla Paksha',
  nakshatra: 'Rohini',
  sunrise: '06:14 AM',
  sunset: '06:28 PM',
  abhijit: '11:58 AM – 12:46 PM',
  rahu: '04:30 PM – 06:00 PM',
};

export default function Home() {
  const [greeting, setGreeting] = useState('Shubh Dophar');
  const { name, location } = useUserProfile();
  const { stats } = useJaapStorage();
  const today = new Date();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Suprabhat');
    else if (hour < 17) setGreeting('Shubh Dophar');
    else setGreeting('Shubh Sandhya');
  }, []);

  return (
    <div className="min-h-full pb-6 relative">
      {/* Subtle mandala backdrop */}
      <div
        className="pointer-events-none absolute top-20 right-0 w-64 h-64 opacity-[0.04]"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--accent)]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.3" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.2" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>
      </div>

      <HomeHeader greeting={greeting} dateLine={formatHomeDate(today)} />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="px-4 space-y-4"
      >
        {/* Profile card */}
        <motion.div variants={staggerItem} className="home-glass-card p-4 flex items-center gap-3">
          <Link to="/profile" className="relative shrink-0">
            <motion.div
              animate={{ boxShadow: ['0 0 0 0 rgba(232,184,74,0.3)', '0 0 0 6px rgba(232,184,74,0)', '0 0 0 0 rgba(232,184,74,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-[52px] h-[52px] rounded-full p-[2px] bg-gradient-to-br from-[#e8b84a] to-[#8b6914]"
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80"
                alt={name}
                className="w-full h-full rounded-full object-cover border-2 avatar-img-border"
              />
            </motion.div>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-[var(--purple-accent)] tracking-wide">Namaste</p>
            <h2 className="font-display text-[22px] text-[var(--text-primary)] flex items-center gap-1.5 leading-tight mt-0.5">
              {name}
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              </motion.span>
            </h2>
            <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {location}
            </p>
          </div>
          <Link to="/jaap" className="shrink-0">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-0.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold btn-jaap-primary"
            >
              Begin Jaap
              <ChevronRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={staggerItem} className="home-glass-card flex divide-x divide-[var(--border)]">
          <StatCell
            icon={<TrendingUp className="w-5 h-5 text-[var(--purple-accent)]" />}
            label="Streak"
            value={`${stats.currentStreak}`}
            sub="Days"
          />
          <StatCell
            icon={
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-[var(--green-accent)] opacity-60" />
                <span className="absolute inset-1 rounded-full border border-[var(--green-accent)] opacity-40" />
                <Target className="w-3 h-3 text-[var(--green-accent)] relative z-10" />
              </span>
            }
            label="Total Jaap"
            value={stats.totalJaap >= 1000 ? `${(stats.totalJaap / 1000).toFixed(1)}k` : String(stats.totalJaap)}
            sub="Mantras"
          />
          <StatCell
            icon={<CalendarDays className="w-5 h-5 text-[var(--blue-accent)]" />}
            label="Tithi"
            value={panchang.tithiShort}
            sub={panchang.paksha}
            serif
          />
        </motion.div>

        {/* Panchang */}
        <motion.div variants={staggerItem} className="home-glass-card p-4 overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-display text-lg text-[var(--text-primary)]">Today&apos;s Panchang</h3>
            <span className="flex items-center gap-1 text-[10px] font-semibold gold-text uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Live
            </span>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Tithi</p>
                <p className="text-sm text-[var(--text-primary)] leading-snug">{panchang.tithi}</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Nakshatra</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{panchang.nakshatra}</p>
              </div>
              <div className="flex gap-4 pt-1 text-xs text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  {panchang.sunrise}
                </span>
                <span className="flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  {panchang.sunset}
                </span>
              </div>
            </div>
            <div className="w-[100px] shrink-0">
              <MoonIllustration className="w-full aspect-square" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <MuhuratRow
              icon={<Sun className="w-4 h-4 text-emerald-400" />}
              label="Abhijit Muhurat"
              time={panchang.abhijit}
              variant="green"
            />
            <MuhuratRow
              icon={<Star className="w-4 h-4 text-rose-300" />}
              label="Rahu Kaal"
              time={panchang.rahu}
              variant="rose"
            />
          </div>
        </motion.div>

        {/* Quick actions — circular orbs */}
        <motion.div variants={staggerItem}>
          <div className="flex justify-between items-start px-1 pt-1 pb-2">
            <QuickActionOrb
              to="/jaap"
              delay={0.05}
              label="Mantra Library"
              glowClass="shadow-[0_0_24px_rgba(167,139,250,0.25)]"
              icon={<Flower2 className="w-6 h-6 text-[var(--purple-accent)]" />}
            />
            <QuickActionOrb
              to="/puja"
              delay={0.1}
              label="Daily Puja"
              glowClass="shadow-[0_0_24px_rgba(232,184,74,0.3)]"
              icon={<Flame className="w-6 h-6 text-[var(--accent)]" />}
            />
            <QuickActionOrb
              delay={0.15}
              label="Calendar"
              glowClass="shadow-[0_0_24px_rgba(96,165,250,0.25)]"
              icon={<CalendarDays className="w-6 h-6 text-[var(--blue-accent)]" />}
              onClick={() => document.getElementById('panchang-section')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <QuickActionOrb
              to="/palm-reading"
              delay={0.2}
              label="Astro Insights"
              glowClass="shadow-[0_0_24px_rgba(244,114,182,0.25)]"
              icon={<Orbit className="w-6 h-6 text-[var(--pink-accent)]" />}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatCell({
  icon,
  label,
  value,
  sub,
  serif,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  serif?: boolean;
}) {
  return (
    <div className="flex-1 flex flex-col items-center py-4 px-2 text-center">
      <div className="mb-2">{icon}</div>
      <span className="text-[10px] text-[var(--text-muted)]">{label}</span>
      <span className={`mt-1 text-[var(--text-primary)] leading-tight ${serif ? 'font-display text-lg' : 'text-base font-semibold tabular-nums'}`}>
        {value}
      </span>
      <span className="text-[10px] text-[var(--text-muted)] mt-0.5">{sub}</span>
    </div>
  );
}

function MuhuratRow({
  icon,
  label,
  time,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  time: string;
  variant: 'green' | 'rose';
}) {
  const rowClass = variant === 'green' ? 'muhurat-green' : 'muhurat-rose';
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      id={variant === 'green' ? 'panchang-section' : undefined}
      className={`w-full flex items-center justify-between p-3 rounded-xl border ${rowClass}`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
        {time}
        <ChevronRight className="w-4 h-4 opacity-60" />
      </div>
    </motion.button>
  );
}
