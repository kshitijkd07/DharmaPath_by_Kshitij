import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Crown, Star, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ui/ScreenHeader';
import Button from '../components/ui/Button';
import StatsRow from '../components/ui/StatsRow';

export default function Subscription() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    { id: 'seeker', name: 'Seeker', price: 'Free', features: ['5 Puja Vidhis', 'Basic Jaap', 'Ad-supported'], icon: <Star className="w-6 h-6 text-[var(--text-muted)]" />, popular: false },
    { id: 'devotee', name: 'Devotee', price: billing === 'annual' ? '₹1,000/yr' : '₹101/mo', features: ['All Pujas', 'Ad-free', 'Full history'], icon: <Shield className="w-6 h-6 text-emerald-400" />, popular: true },
    { id: 'sadhak', name: 'Sadhak', price: billing === 'annual' ? '₹2,500/yr' : '₹251/mo', features: ['All Devotee', 'Unlimited Palm AI', 'Priority support'], icon: <Crown className="w-6 h-6 text-[var(--accent)]" />, popular: false },
  ];

  return (
    <div className="min-h-full pb-4">
      <header className="px-4 pt-5 flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)} className="icon-btn"><ArrowLeft className="w-5 h-5" /></button>
        <ScreenHeader title="Premium" subtitle="Deepen your practice" />
      </header>

      <div className="px-4 space-y-4 -mt-2">
        <div className="flex p-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-tile)]">
          {(['monthly', 'annual'] as const).map((c) => (
            <button key={c} type="button" onClick={() => setBilling(c)} className={`flex-1 py-2.5 text-sm rounded-xl capitalize ${billing === c ? 'gold-text bg-[var(--bg-elevated)]' : 'text-[var(--text-muted)]'}`}>
              {c}
            </button>
          ))}
        </div>

        <StatsRow
          items={[
            { icon: <Star className="w-5 h-5 text-[var(--purple-accent)]" />, label: 'Plans', value: 3 },
            { icon: <Crown className="w-5 h-5 text-[var(--accent)]" />, label: 'Save', value: '17%' },
            { icon: <Shield className="w-5 h-5 text-emerald-400" />, label: 'Secure', value: 'UPI' },
          ]}
        />

        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`spirit-card p-5 ${plan.popular ? 'border-[var(--accent)]/40' : ''}`}
          >
            {plan.popular && <span className="text-[10px] uppercase gold-text font-bold">Most popular</span>}
            <div className="flex items-center gap-3 my-3">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">{plan.icon}</div>
              <div>
                <p className="font-display text-xl">{plan.name}</p>
                <p className="font-semibold text-sm">{plan.price}</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                  <Check className="w-4 h-4 text-[var(--accent)] shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? 'gold' : 'secondary'} fullWidth>
              {plan.id === 'seeker' ? 'Current' : 'Select'}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
