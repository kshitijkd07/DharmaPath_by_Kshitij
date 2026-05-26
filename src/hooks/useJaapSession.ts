import { useCallback, useEffect, useState } from 'react';

const PREFS_KEY = 'jaapSessionPrefs';

export interface JaapPrefs {
  reminderEnabled: boolean;
  reminderTime: string;
  savedMantras: string[];
}

const defaultPrefs: JaapPrefs = {
  reminderEnabled: false,
  reminderTime: '06:00',
  savedMantras: [
    'Om Namah Shivaya',
    'Om Bhur Bhuva Swaha (Gayatri)',
    'Hare Krishna Hare Rama',
    'Om Gan Ganapataye Namo Namah',
  ],
};

function loadPrefs(): JaapPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultPrefs;
}

export function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function useJaapSession() {
  const [prefs, setPrefs] = useState<JaapPrefs>(loadPrefs);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  useEffect(() => {
    if (!isRunning) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const stopTimer = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setElapsed(0);
    setIsRunning(false);
  }, []);

  const toggleReminder = useCallback(() => {
    setPrefs((p) => ({ ...p, reminderEnabled: !p.reminderEnabled }));
  }, []);

  const setReminderTime = useCallback((time: string) => {
    setPrefs((p) => ({ ...p, reminderTime: time }));
  }, []);

  const addMantra = useCallback((mantra: string) => {
    setPrefs((p) => ({
      ...p,
      savedMantras: p.savedMantras.includes(mantra) ? p.savedMantras : [...p.savedMantras, mantra],
    }));
  }, []);

  return {
    prefs,
    elapsed,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    toggleReminder,
    setReminderTime,
    addMantra,
    formatElapsed: () => formatElapsed(elapsed),
  };
}

/** Mala rounds: 108 beads per mala */
export function getMalaInfo(count: number, goal: number) {
  const malaSize = 108;
  const malaTotal = Math.max(1, Math.ceil(goal / malaSize));
  const malaIndex = Math.min(malaTotal, Math.floor(count / malaSize) + 1);
  const countInMala = count % malaSize || (count > 0 && count % malaSize === 0 ? malaSize : count);
  return { malaIndex, malaTotal, countInMala, malaSize };
}
