import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Clock, CheckCircle2, Star, ShoppingBag, Flame, BookMarked } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ui/ScreenHeader';
import FeatureTile from '../components/ui/FeatureTile';
import StatsRow from '../components/ui/StatsRow';

const categories = ['All', 'Daily', 'Deity', 'Occasion', 'Festival'];

const pujas = [
  { id: 1, title: 'Daily Shiva Puja', category: 'Daily', deity: 'Shiva', duration: '15 mins', rating: 4.8, verified: true },
  { id: 2, title: 'Satyanarayan Katha', category: 'Occasion', deity: 'Vishnu', duration: '90 mins', rating: 4.9, verified: true },
  { id: 3, title: 'Ganesh Chaturthi Sthapana', category: 'Festival', deity: 'Ganesha', duration: '45 mins', rating: 5.0, verified: true },
  { id: 4, title: 'Navratri Ghatasthapana', category: 'Festival', deity: 'Durga', duration: '60 mins', rating: 4.7, verified: true },
  { id: 5, title: 'Hanuman Chalisa Path', category: 'Daily', deity: 'Hanuman', duration: '10 mins', rating: 4.9, verified: false },
];

export default function Puja() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = pujas.filter(
    (p) =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!verifiedOnly || p.verified)
  );

  const verifiedCount = pujas.filter((p) => p.verified).length;

  return (
    <div className="min-h-full pb-4">
      <ScreenHeader
        title="Puja Vidhi"
        subtitle="Authentic step-by-step guides"
        action={
          <button type="button" className="icon-btn" aria-label="Library">
            <BookMarked className="w-5 h-5 text-[var(--accent)]" />
          </button>
        }
      />

      <div className="px-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="search"
            placeholder="Search pujas, deities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-tile)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
          />
          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${verifiedOnly ? 'gold-text' : 'text-[var(--text-muted)]'}`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <StatsRow
          items={[
            { icon: <Flame className="w-5 h-5 text-[var(--accent)]" />, label: 'Total', value: pujas.length },
            { icon: <CheckCircle2 className="w-5 h-5 text-[var(--green-accent)]" />, label: 'Verified', value: verifiedCount },
            { icon: <Star className="w-5 h-5 text-amber-400" />, label: 'Avg Rating', value: '4.9' },
          ]}
        />

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${
                activeCategory === cat
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] gold-text'
                  : 'border-[var(--border)] text-[var(--text-muted)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.map((puja, i) => (
          <motion.button
            key={puja.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => navigate(`/puja/${puja.id}`)}
            className="spirit-card w-full p-4 text-left"
          >
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider gold-text">{puja.category}</p>
                <p className="font-display text-lg mt-0.5">{puja.title}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Deity · {puja.deity}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-[var(--accent)]" />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {puja.duration}</span>
              <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-current" /> {puja.rating}</span>
              {puja.verified && <span className="text-emerald-400 ml-auto">Verified</span>}
            </div>
          </motion.button>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-[var(--text-muted)] py-12">No pujas match your search.</p>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <FeatureTile icon={<ShoppingBag className="w-6 h-6 text-[var(--accent)]" />} title="Samagri" status="Shop" onClick={() => {}} />
          <FeatureTile icon={<BookMarked className="w-6 h-6 text-[var(--purple-accent)]" />} title="Saved" status="My List" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
