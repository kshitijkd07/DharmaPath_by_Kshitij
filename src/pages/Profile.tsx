import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Settings, LogOut, ChevronRight, Award, Flame, BarChart3, Crown, Edit3, Medal, Bell, Bookmark,
} from 'lucide-react';
import ScreenHeader from '../components/ui/ScreenHeader';
import FeatureTile from '../components/ui/FeatureTile';
import StatsRow from '../components/ui/StatsRow';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useJaapStorage } from '../hooks/useJaapStorage';
import { useUserProfile } from '../hooks/useUserProfile';

export default function Profile({ onLogout }: { onLogout: () => void }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { stats } = useJaapStorage();
  const { name, location, deity } = useUserProfile();

  const user = {
    name,
    phone: '+91 98765 43210',
    city: location,
    deity: deity || 'Shiva',
    subscription: 'Free',
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className="min-h-full pb-4">
      <ScreenHeader
        title="Profile"
        subtitle="Spiritual journey & settings"
        action={
          <button type="button" className="icon-btn" aria-label="Settings">
            <Settings className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 space-y-4">
        <div className="spirit-card p-4 flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[var(--accent)]/30">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80" alt="" className="w-full h-full object-cover" />
            <button type="button" className="absolute bottom-0 right-0 w-6 h-6 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md flex items-center justify-center">
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1">
            <p className="font-display text-xl">{user.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{user.phone}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{user.city} · {user.deity}</p>
          </div>
        </div>

        <Link to="/subscription" className="block">
          <motion.div whileTap={{ scale: 0.99 }} className="spirit-card p-4 flex items-center gap-3 border-[var(--accent)]/20">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
              <Crown className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Plan · {user.subscription}</p>
              <p className="text-xs text-[var(--text-muted)]">Upgrade for premium</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
          </motion.div>
        </Link>

        <StatsRow
          items={[
            { icon: <Award className="w-5 h-5 text-[var(--accent)]" />, label: 'Total Jaap', value: stats.totalJaap.toLocaleString() },
            { icon: <Flame className="w-5 h-5 text-rose-400" />, label: 'Streak', value: stats.currentStreak },
            { icon: <BarChart3 className="w-5 h-5 text-[var(--purple-accent)]" />, label: 'Best', value: stats.longestStreak },
          ]}
        />

        <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Milestones</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { label: 'First 108', icon: '📿', ok: stats.totalJaap >= 108 },
            { label: 'Dedicated', icon: '🔥', ok: stats.totalJaap >= 1080 },
            { label: 'Sadhak', icon: '✨', ok: stats.totalJaap >= 10800 },
          ].map((m) => (
            <div key={m.label} className={`spirit-tile p-3 min-w-[88px] text-center shrink-0 ${m.ok ? 'border-[var(--accent)]/30' : 'opacity-50'}`}>
              <span className="text-xl">{m.icon}</span>
              <p className="text-[10px] mt-1 text-[var(--text-muted)]">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FeatureTile icon={<Medal className="w-6 h-6 text-[var(--accent)]" />} title="Badges" status="View" onClick={() => {}} />
          <FeatureTile icon={<Bell className="w-6 h-6 text-[var(--blue-accent)]" />} title="Reminders" status="Manage" onClick={() => {}} />
          <FeatureTile icon={<Bookmark className="w-6 h-6 text-[var(--pink-accent)]" />} title="Saved" status="Items" onClick={() => {}} />
        </div>

        <div className="spirit-card p-4">
          <ThemeToggle showLabels />
        </div>

        <div className="spirit-card divide-y divide-[var(--border)]">
          {[
            { label: 'Primary Deity', value: user.deity },
            { label: 'Daily Reminder', value: '06:00 AM' },
            { label: 'Language', value: 'English + Sanskrit' },
          ].map((row) => (
            <button key={row.label} type="button" className="w-full flex justify-between p-4 text-left hover:bg-[var(--accent-soft)] transition-colors">
              <div>
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{row.value}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-4 rounded-2xl border border-[var(--border)] text-[var(--text-muted)] text-sm flex items-center justify-center gap-2 hover:border-rose-500/30 hover:text-rose-400 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>

      <Modal open={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Log out?">
        <p className="text-sm text-[var(--text-muted)] mb-6 text-left">
          You will need to sign in again to access your spiritual journey and saved progress.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setShowLogoutConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" fullWidth onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Modal>
    </div>
  );
}
