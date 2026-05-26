import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Upload, X, Hexagon, Heart, Activity, Coins, AlertCircle, Camera, BarChart3, History } from 'lucide-react';
import Markdown from 'react-markdown';
import { usePalmReading } from '../hooks/usePalmReading';
import ScreenHeader from '../components/ui/ScreenHeader';
import FeatureTile from '../components/ui/FeatureTile';
import StatsRow from '../components/ui/StatsRow';
import Button from '../components/ui/Button';
import ScanOverlay from '../components/palm/ScanOverlay';
import AnalysisLoader from '../components/palm/AnalysisLoader';

export default function PalmReading() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [scanActive, setScanActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { reading, loading, error, getReading, resetReading } = usePalmReading();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      resetReading();
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!imageSrc) return;
    setScanActive(true);
    await getReading(imageSrc);
    setScanActive(false);
  };

  const clear = () => {
    setImageSrc(null);
    resetReading();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-full pb-4">
      <ScreenHeader
        title="AI Palmistry"
        subtitle="Vedic lines · Cosmic insight"
        action={
          <button type="button" className="icon-btn" aria-label="Info">
            <Hexagon className="w-5 h-5 text-[var(--accent)]" />
          </button>
        }
      />

      <div className="px-4 space-y-4">
        <div className="spirit-card flex items-center gap-3 p-3.5">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-[var(--text-muted)]">Scan Mode</p>
            <p className="text-sm font-medium">{imageSrc ? 'Ready to analyze' : 'Upload dominant palm'}</p>
          </div>
          <button type="button" className="gold-text text-sm font-medium" onClick={() => fileInputRef.current?.click()}>
            {imageSrc ? 'Replace' : 'Upload'}
          </button>
        </div>

        {!imageSrc ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="spirit-card w-full py-14 flex flex-col items-center border-dashed"
          >
            <Upload className="w-8 h-8 text-[var(--accent)] mb-2" />
            <p className="text-sm font-medium">Tap to upload palm</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Good lighting · palm up</p>
          </button>
        ) : (
          <div className="spirit-card overflow-hidden p-0">
            <div className="relative">
              <img src={imageSrc} alt="Palm" className="w-full max-h-52 object-cover" />
              <ScanOverlay active={loading || scanActive} />
              <button type="button" onClick={clear} className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            {!reading && !loading && (
              <div className="p-4">
                <Button variant="gold" fullWidth onClick={analyze} icon={<Sparkles className="w-5 h-5" />}>
                  Analyze destiny
                </Button>
              </div>
            )}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleUpload} className="hidden" />

        {error && <div className="spirit-card p-4 text-sm text-rose-400">{error}</div>}

        <AnimatePresence>{loading && <AnalysisLoader />}</AnimatePresence>

        <AnimatePresence>
          {reading && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="spirit-card p-5 text-left">
              <p className="text-[11px] gold-text uppercase tracking-wider mb-2">Your reading</p>
              <div className="prose prose-sm prose-invert max-w-none text-[var(--text-secondary)] prose-headings:font-display prose-headings:text-[var(--text-primary)]">
                <Markdown>{reading}</Markdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!reading && !loading && (
          <>
            <StatsRow
              items={[
                { icon: <Heart className="w-5 h-5 text-rose-400" />, label: 'Heart', value: 'Line' },
                { icon: <Coins className="w-5 h-5 text-amber-400" />, label: 'Fate', value: 'Line' },
                { icon: <Activity className="w-5 h-5 text-emerald-400" />, label: 'Life', value: 'Line' },
              ]}
            />
            <div className="grid grid-cols-2 gap-3">
              <FeatureTile icon={<Camera className="w-6 h-6 text-[var(--accent)]" />} title="How it works" status="Guide" onClick={() => {}} />
              <FeatureTile icon={<History className="w-6 h-6 text-[var(--purple-accent)]" />} title="Past readings" status="Soon" onClick={() => {}} />
              <FeatureTile icon={<AlertCircle className="w-6 h-6 text-indigo-400" />} title="Doshas" status="Detect" onClick={() => {}} />
              <FeatureTile icon={<BarChart3 className="w-6 h-6 text-[var(--pink-accent)]" />} title="Insights" status="Deep" onClick={() => {}} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
