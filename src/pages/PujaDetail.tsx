import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Star, CheckCircle2, Circle, CheckCircle, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import StatsRow from '../components/ui/StatsRow';
import Button from '../components/ui/Button';

const pujaDetailsDB: Record<number, {
  title: string; deity: string; duration: string; rating: number; verified: boolean;
  overview: string;
  samagri: { id: number; name: string; checked: boolean }[];
  steps: { step: number; title: string; instruction: string; mantra?: string }[];
}> = {
  1: {
    title: 'Daily Shiva Puja', deity: 'Shiva', duration: '15 mins', rating: 4.8, verified: true,
    overview: 'A simple daily puja for peace and spiritual growth. Best after morning bath.',
    samagri: [
      { id: 1, name: 'Shiva Linga or Idol', checked: false },
      { id: 2, name: 'Fresh Water (Jal)', checked: false },
      { id: 3, name: 'Raw Milk', checked: false },
      { id: 4, name: 'Bilva Patra', checked: false },
      { id: 5, name: 'Chandan & Diya', checked: false },
    ],
    steps: [
      { step: 1, title: 'Achamana', instruction: 'Three sips of water:', mantra: 'Om Keshavaya Namah...' },
      { step: 2, title: 'Sankalpa', instruction: 'State your intent with water and rice.' },
      { step: 3, title: 'Abhishekam', instruction: 'Bathe the Linga:', mantra: 'Om Namah Shivaya' },
      { step: 4, title: 'Offering', instruction: 'Chandan, Bilva, Diya and incense.' },
      { step: 5, title: 'Aarti', instruction: 'Perform Aarti and seek forgiveness.' },
    ],
  },
};

export default function PujaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'overview' | 'samagri' | 'vidhi'>('overview');

  const puja = pujaDetailsDB[Number(id)] || {
    title: 'Puja Vidhi', deity: 'Various', duration: '30 mins', rating: 4.5, verified: false,
    overview: 'Instructions coming soon.',
    samagri: [{ id: 1, name: 'Basic Puja Kit', checked: false }],
    steps: [{ step: 1, title: 'Prepare', instruction: 'Clean area and gather materials.' }],
  };

  const [samagri, setSamagri] = useState(puja.samagri);
  const allChecked = samagri.every((s) => s.checked);
  const ready = samagri.filter((s) => s.checked).length;

  return (
    <div className="min-h-full pb-4">
      <header className="px-4 pt-5 pb-3 border-b border-[var(--border)]">
        <div className="flex items-start gap-3">
          <button type="button" onClick={() => navigate(-1)} className="icon-btn shrink-0 mt-0.5">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-wider gold-text">{puja.deity}</p>
            <h1 className="font-display text-2xl">{puja.title}</h1>
          </div>
        </div>
        <StatsRow
          items={[
            { icon: <Clock className="w-5 h-5 text-[var(--blue-accent)]" />, label: 'Duration', value: puja.duration.replace(' mins', 'm') },
            { icon: <Star className="w-5 h-5 text-amber-400" />, label: 'Rating', value: puja.rating },
            { icon: <CheckCircle2 className="w-5 h-5 text-[var(--green-accent)]" />, label: 'Ready', value: `${ready}/${samagri.length}` },
          ]}
        />
        <div className="flex p-1 rounded-2xl bg-[var(--bg-tile)] border border-[var(--border)] mt-3">
          {(['overview', 'samagri', 'vidhi'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm rounded-xl capitalize ${tab === t ? 'bg-[var(--bg-elevated)] gold-text' : 'text-[var(--text-muted)]'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="spirit-card p-5">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{puja.overview}</p>
            </div>
            <Button variant="gold" fullWidth onClick={() => setTab('samagri')}>Check samagri</Button>
          </motion.div>
        )}
        {tab === 'samagri' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="spirit-card divide-y divide-[var(--border)]">
              {samagri.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSamagri(samagri.map((s) => (s.id === item.id ? { ...s, checked: !s.checked } : s)))}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  {item.checked ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-[var(--text-muted)]" />}
                  <span className={`text-sm ${item.checked ? 'line-through text-[var(--text-muted)]' : ''}`}>{item.name}</span>
                </button>
              ))}
            </div>
            <Button variant="gold" fullWidth disabled={!allChecked} onClick={() => setTab('vidhi')}>
              {allChecked ? 'Start vidhi' : 'Gather all items'}
            </Button>
          </motion.div>
        )}
        {tab === 'vidhi' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-4">
            {puja.steps.map((step, i) => (
              <div key={step.step} className="relative pl-8">
                {i < puja.steps.length - 1 && <div className="absolute left-3 top-8 bottom-[-16px] w-px bg-[var(--border)]" />}
                <div className="absolute left-0 w-6 h-6 rounded-full bg-[var(--accent-soft)] gold-text text-xs font-bold flex items-center justify-center">{step.step}</div>
                <div className="spirit-card p-4">
                  <p className="font-medium text-sm mb-1">{step.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{step.instruction}</p>
                  {step.mantra && (
                    <div className="mt-2 p-2 rounded-lg bg-[var(--accent-soft)] text-xs italic flex gap-2">
                      <PlayCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
                      {step.mantra}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <Button variant="gold" fullWidth onClick={() => navigate('/home')}>
              <CheckCircle2 className="w-5 h-5" /> Complete puja
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
