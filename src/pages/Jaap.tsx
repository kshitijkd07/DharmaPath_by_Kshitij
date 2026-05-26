import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  RotateCcw,
  Play,
  Pause,
  Bell,
  BarChart3,
  Bookmark,
  Moon,
  Activity,
  Target,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import ScreenHeader from '../components/ui/ScreenHeader';
import FeatureTile from '../components/ui/FeatureTile';
import StatsRow from '../components/ui/StatsRow';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import JaapProgressRing from '../components/jaap/JaapProgressRing';
import { useJaapStorage } from '../hooks/useJaapStorage';
import { useJaapSession, getMalaInfo } from '../hooks/useJaapSession';

const goals = [108, 216, 540, 1080];

export default function Jaap() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(108);
  const [mantra, setMantra] = useState('Om Namah Shivaya');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [sheet, setSheet] = useState<'settings' | 'mantra' | 'stats' | 'reminder' | null>(null);

  const { stats, recordSession } = useJaapStorage();
  const {
    prefs,
    startTimer,
    stopTimer,
    resetTimer,
    formatElapsed,
    toggleReminder,
    setReminderTime,
  } = useJaapSession();

  const { malaIndex, malaTotal } = getMalaInfo(count, goal);

  const vibrate = useCallback(() => {
    navigator.vibrate?.(35);
  }, []);

  const handleTap = () => {
    if (count < goal) {
      setCount((c) => c + 1);
      vibrate();
      if (count === 0) startTimer();
    }
  };

  useEffect(() => {
    if (count === goal && count > 0) {
      setShowCelebration(true);
      setIsPlaying(false);
      stopTimer();
      recordSession(count, mantra, goal);
      const t = setTimeout(() => setShowCelebration(false), 4500);
      return () => clearTimeout(t);
    }
  }, [count, goal, mantra, recordSession, stopTimer]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setCount((prev) => {
        if (prev < goal) {
          vibrate();
          return prev + 1;
        }
        setIsPlaying(false);
        return prev;
      });
    }, 550);
    return () => clearInterval(id);
  }, [isPlaying, goal, vibrate]);

  const handleStart = () => {
    if (count >= goal) return;
    setIsPlaying(true);
    startTimer();
  };

  const handleReset = () => {
    if (count > 0) setShowConfirmReset(true);
    else {
      setCount(0);
      resetTimer();
    }
  };

  const confirmReset = () => {
    setCount(0);
    setIsPlaying(false);
    resetTimer();
    setShowConfirmReset(false);
  };

  if (focusMode) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 relative">
        <button
          type="button"
          onClick={() => setFocusMode(false)}
          className="absolute top-4 right-4 text-xs text-[var(--text-muted)] uppercase tracking-widest"
        >
          Exit focus
        </button>
        <p className="font-display text-xl text-[var(--text-primary)] mb-8 text-center">{mantra}</p>
        <JaapProgressRing
          count={count}
          goal={goal}
          malaIndex={malaIndex}
          malaTotal={malaTotal}
          onTap={handleTap}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full pb-4">
      <ScreenHeader
        title="Jaap Mala"
        subtitle="Digital mantra counter"
        action={
          <button type="button" className="icon-btn" onClick={() => setSheet('settings')} aria-label="Settings">
            <Settings className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 space-y-4">
        {/* Current Mantra Card */}
        <div className="spirit-card flex items-center gap-3 p-3.5">
          <div className="relative w-14 h-14 shrink-0">
            <div className="absolute inset-0 rounded-full border border-[var(--accent)]/30 animate-breathe opacity-60" />
            <div className="absolute inset-1 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--bg-glass)]">
              <span className="text-xl text-[var(--accent)] font-display">ॐ</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-[var(--text-muted)]">Current Mantra</p>
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{mantra}</p>
          </div>
          <button type="button" onClick={() => setSheet('mantra')} className="text-sm font-medium gold-text shrink-0">
            Change
          </button>
        </div>

        {/* Progress Ring */}
        <div className="py-2">
          <JaapProgressRing
            count={count}
            goal={goal}
            malaIndex={malaIndex}
            malaTotal={malaTotal}
            onTap={handleTap}
          />
        </div>

        {/* Start / Reset */}
        <div className="flex justify-center gap-10 pt-1 pb-2">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={isPlaying ? () => { setIsPlaying(false); stopTimer(); } : handleStart}
              disabled={count >= goal}
              className="w-14 h-14 rounded-full border border-[var(--border-strong)] bg-[var(--bg-glass)] flex items-center justify-center text-[var(--text-primary)] disabled:opacity-40"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <span className="text-xs text-[var(--text-muted)]">{isPlaying ? 'Pause' : 'Start'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-14 h-14 rounded-full border border-[var(--border-strong)] bg-[var(--bg-glass)] flex items-center justify-center text-[var(--text-primary)]"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <span className="text-xs text-[var(--text-muted)]">Reset</span>
          </div>
        </div>

        {/* Quick Stats */}
        <StatsRow
          items={[
            {
              icon: <Activity className="w-5 h-5 text-[var(--purple-accent)]" />,
              label: 'Target Count',
              value: goal,
            },
            {
              icon: <Target className="w-5 h-5 text-[var(--green-accent)]" />,
              label: 'Completed',
              value: count,
            },
            {
              icon: <Clock className="w-5 h-5 text-[var(--blue-accent)]" />,
              label: 'Time Elapsed',
              value: formatElapsed(),
            },
          ]}
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <FeatureTile
            icon={<Bell className="w-6 h-6 text-[var(--accent)]" />}
            title="Reminder"
            status={prefs.reminderEnabled ? 'On' : 'Off'}
            onClick={() => setSheet('reminder')}
          />
          <FeatureTile
            icon={<BarChart3 className="w-6 h-6 text-[var(--purple-accent)]" />}
            title="Stats"
            status="View"
            onClick={() => setSheet('stats')}
          />
          <FeatureTile
            icon={<Bookmark className="w-6 h-6 text-[var(--pink-accent)]" />}
            title="Mantras"
            status="My List"
            onClick={() => setSheet('mantra')}
          />
          <FeatureTile
            icon={<Moon className="w-6 h-6 text-[var(--blue-accent)]" />}
            title="Focus Mode"
            status={focusMode ? 'On' : 'Off'}
            onClick={() => setFocusMode(true)}
          />
        </div>
      </div>

      {/* Settings sheet */}
      <Modal open={sheet === 'settings'} onClose={() => setSheet(null)} title="Settings">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Target (Jaap goal)</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {goals.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => { setGoal(g); setCount(0); resetTimer(); }}
              className={`py-2 rounded-xl text-sm border ${
                goal === g ? 'border-[var(--accent)] gold-text bg-[var(--accent-soft)]' : 'border-[var(--border)]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {stats.currentStreak > 0 && (
          <p className="text-sm text-[var(--text-secondary)] text-center">
            🔥 {stats.currentStreak} day streak · {stats.totalJaap.toLocaleString()} total
          </p>
        )}
      </Modal>

      {/* Mantra picker */}
      <Modal open={sheet === 'mantra'} onClose={() => setSheet(null)} title="Choose Mantra">
        <ul className="space-y-2 text-left max-h-56 overflow-y-auto">
          {prefs.savedMantras.map((m) => (
            <li key={m}>
              <button
                type="button"
                onClick={() => { setMantra(m); setSheet(null); }}
                className={`w-full p-3 rounded-xl text-left text-sm border transition-colors ${
                  mantra === m ? 'border-[var(--accent)] bg-[var(--accent-soft)] gold-text' : 'border-[var(--border)]'
                }`}
              >
                {m}
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      {/* Stats */}
      <Modal open={sheet === 'stats'} onClose={() => setSheet(null)} title="Your Stats">
        <div className="grid grid-cols-2 gap-3 mb-4 text-left">
          <div className="spirit-tile p-3 text-center">
            <p className="text-2xl font-semibold">{stats.totalJaap.toLocaleString()}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase mt-1">Total Jaaps</p>
          </div>
          <div className="spirit-tile p-3 text-center">
            <p className="text-2xl font-semibold">{stats.currentStreak}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase mt-1">Day Streak</p>
          </div>
        </div>
        {stats.sessions.length > 0 ? (
          <ul className="space-y-2 max-h-40 overflow-y-auto text-left">
            {stats.sessions.map((s) => (
              <li key={s.date} className="spirit-tile p-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{s.count}/{s.goal}</span>
                  <span className="text-[var(--text-muted)] text-xs">{s.date}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{s.mantra}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">Complete a session to see history.</p>
        )}
      </Modal>

      {/* Reminder */}
      <Modal open={sheet === 'reminder'} onClose={() => setSheet(null)} title="Daily Reminder">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Enable reminder</span>
          <button
            type="button"
            onClick={toggleReminder}
            className={`w-11 h-6 rounded-full relative ${prefs.reminderEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
          >
            <motion.div
              animate={{ left: prefs.reminderEnabled ? '1.35rem' : '0.2rem' }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white"
            />
          </button>
        </div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Time</label>
        <input
          type="time"
          value={prefs.reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full mt-2 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-glass)] text-[var(--text-primary)]"
          disabled={!prefs.reminderEnabled}
        />
        <p className="text-xs text-[var(--text-muted)] mt-3">Browser notifications when enabled.</p>
      </Modal>

      <Modal open={showConfirmReset} onClose={() => setShowConfirmReset(false)} title="Reset count?">
        <p className="text-sm text-[var(--text-muted)] mb-6">Progress and timer will reset to zero.</p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setShowConfirmReset(false)}>Cancel</Button>
          <Button variant="danger" fullWidth onClick={confirmReset}>Reset</Button>
        </div>
      </Modal>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[var(--bg-base)]/95 backdrop-blur-xl p-4"
          >
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className="text-center max-w-sm">
              <CheckCircle2 className="w-16 h-16 text-[var(--accent)] mx-auto mb-4" />
              <h3 className="font-display text-3xl mb-2">Mala Complete</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">{goal} · {mantra}</p>
              <Button variant="gold" fullWidth onClick={() => { setShowCelebration(false); setCount(0); resetTimer(); }}>
                New Session
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
