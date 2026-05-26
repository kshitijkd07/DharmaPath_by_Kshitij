import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, MapPin, Bell, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import FeatureTile from '../components/ui/FeatureTile';
import { notifyProfileUpdate } from '../hooks/useUserProfile';

const steps = [
  { title: 'Dharma Path', subtitle: 'Spiritual OS', desc: 'Your daily guide for devotion, ritual, and calm.', icon: '🕉️' },
  { title: 'मन से, डर से नहीं', subtitle: 'Philosophy', desc: 'Connect through love and understanding — not fear.', icon: null, lucide: Heart },
  { title: 'Sacred Tools', subtitle: 'Features', features: true },
  { title: 'Personalize', subtitle: 'You', form: true },
  { title: 'Stay Present', subtitle: 'Permissions', perms: true },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({ name: '', city: 'Agra', state: 'Uttar Pradesh', deity: '', reminderTime: '06:00' });
  const current = steps[step];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      notifyProfileUpdate();
      onComplete();
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col max-w-lg mx-auto px-4 py-6">
      <div className="flex-1 spirit-card p-8 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="w-full">
            <p className="text-[10px] uppercase tracking-[0.2em] gold-text mb-2">{current.subtitle}</p>
            <h1 className="font-display text-4xl mb-4">{current.title}</h1>

            {current.icon && (
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity }} className="text-5xl mb-6">
                {current.icon}
              </motion.div>
            )}
            {current.lucide && (
              <div className="w-24 h-24 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-rose-400" />
              </div>
            )}
            {current.desc && <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs mx-auto">{current.desc}</p>}

            {current.features && (
              <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                <FeatureTile icon={<span className="text-lg">📅</span>} title="Panchang" status="Daily" onClick={() => {}} />
                <FeatureTile icon={<span className="text-lg">📿</span>} title="Jaap Mala" status="Counter" onClick={() => {}} />
                <FeatureTile icon={<span className="text-lg">✨</span>} title="AI Palm" status="Read" onClick={() => {}} />
                <FeatureTile icon={<span className="text-lg">🔥</span>} title="Puja" status="Guides" onClick={() => {}} />
              </div>
            )}

            {current.form && (
              <div className="space-y-4 mt-4 text-left max-w-xs mx-auto w-full">
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase">Your name</label>
                  <input
                    className="w-full py-3 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-glass)] mt-1"
                    placeholder="Kshitij"
                    value={preferences.name}
                    onChange={(e) => setPreferences({ ...preferences, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase">City</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      className="w-full pl-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-glass)] mt-1"
                      placeholder="Agra"
                      value={preferences.city}
                      onChange={(e) => setPreferences({ ...preferences, city: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase">Deity</label>
                  <select
                    className="w-full py-3 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-glass)] mt-1"
                    value={preferences.deity}
                    onChange={(e) => setPreferences({ ...preferences, deity: e.target.value })}
                  >
                    <option value="">Select</option>
                    {['Shiva', 'Vishnu', 'Krishna', 'Hanuman', 'Durga', 'Ganesha'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {current.perms && (
              <div className="space-y-3 mt-4 text-left max-w-xs mx-auto w-full">
                {[
                  { icon: Bell, t: 'Notifications', d: 'Jaap & festival reminders' },
                  { icon: MapPin, t: 'Location', d: 'Accurate Panchang times' },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="spirit-tile p-4 flex gap-3">
                    <Icon className="w-5 h-5 text-[var(--accent)] shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{t}</p>
                      <p className="text-xs text-[var(--text-muted)]">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pt-6">
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-7 bg-[var(--accent)]' : 'w-2 bg-[var(--border)]'}`} />
          ))}
        </div>
        <Button variant="gold" size="lg" fullWidth onClick={next} icon={step === steps.length - 1 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}>
          {step === steps.length - 1 ? 'Enter Dharma Path' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
