import { useCallback, useEffect, useState } from 'react';

export interface JaapSession {
  date: string;
  count: number;
  mantra: string;
  goal: number;
}

export interface JaapStats {
  totalJaap: number;
  currentStreak: number;
  longestStreak: number;
  sessions: JaapSession[];
  lastSessionDate: string | null;
}

const STORAGE_KEY = 'jaapStats';

const defaultStats: JaapStats = {
  totalJaap: 0,
  currentStreak: 0,
  longestStreak: 0,
  sessions: [],
  lastSessionDate: null,
};

function loadStats(): JaapStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultStats, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultStats;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.round((d2.getTime() - d1.getTime()) / 86400000);
}

export function useJaapStorage() {
  const [stats, setStats] = useState<JaapStats>(loadStats);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordSession = useCallback((count: number, mantra: string, goal: number) => {
    if (count <= 0) return;
    const today = todayKey();
    setStats((prev) => {
      const sessions = [
        { date: today, count, mantra, goal },
        ...prev.sessions.filter((s) => s.date !== today),
      ].slice(0, 30);

      let currentStreak = prev.currentStreak;
      if (prev.lastSessionDate === today) {
        /* same day */
      } else if (!prev.lastSessionDate || daysBetween(prev.lastSessionDate, today) === 1) {
        currentStreak += 1;
      } else if (prev.lastSessionDate !== today) {
        currentStreak = 1;
      }

      const longestStreak = Math.max(prev.longestStreak, currentStreak);

      return {
        totalJaap: prev.totalJaap + count,
        currentStreak,
        longestStreak,
        sessions,
        lastSessionDate: today,
      };
    });
  }, []);

  return { stats, recordSession };
}
