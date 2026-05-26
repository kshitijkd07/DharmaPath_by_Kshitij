import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ScreenHeader from '../components/ui/ScreenHeader';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col max-w-lg mx-auto px-4 py-6">
      <ScreenHeader title="Welcome" subtitle="Continue your spiritual journey" />
      <div className="flex-1 spirit-card p-8 flex flex-col justify-center">
        <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 5, repeat: Infinity }} className="w-16 h-16 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-6 text-2xl">
          🕉️
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {step === 'phone' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (phone.length < 10) return;
                  setLoading(true);
                  setTimeout(() => { setLoading(false); setStep('otp'); }, 800);
                }}
                className="space-y-4"
              >
                <label className="text-xs text-[var(--text-muted)] uppercase">Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full pl-20 py-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-glass)] text-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <Button type="submit" variant="gold" fullWidth loading={loading} disabled={phone.length < 10} icon={<ArrowRight className="w-5 h-5" />}>
                  Send OTP
                </Button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (otp.length < 6) return;
                  setLoading(true);
                  setTimeout(() => { setLoading(false); onLogin(); }, 800);
                }}
                className="space-y-4"
              >
                <label className="text-xs text-[var(--text-muted)] uppercase">OTP</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full pl-12 py-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-glass)] text-center text-2xl tracking-[0.35em] font-mono"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <p className="text-xs text-center text-[var(--text-muted)]">
                  +91 {phone}{' '}
                  <button type="button" className="gold-text" onClick={() => setStep('phone')}>Edit</button>
                </p>
                <Button type="submit" variant="gold" fullWidth loading={loading} disabled={otp.length < 6} icon={<ArrowRight className="w-5 h-5" />}>
                  Verify & Enter
                </Button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
