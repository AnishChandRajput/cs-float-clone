import React from 'react';
import { X, ShoppingBag, Heart, ZoomIn } from 'lucide-react';
import type { Item } from '../data/items';
import { PriceChart } from './PriceChart';
import { motion, AnimatePresence } from 'framer-motion';

interface ItemDetailModalProps {
  item: Item | null;
  onClose: () => void;
  onBuy?: (item: Item) => void;
}

// Generate some fake historical data
const generateChartData = (basePrice: number) => {
  return Array.from({ length: 20 }, (_, i) => ({
    date: `Oct ${i + 1}`,
    price: basePrice * (0.97 + Math.sin((i + 2) * 0.7) * 0.03 + (i % 3) * 0.004)
  }));
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
};

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onBuy }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    setIsLiked(false);
  }, [item?.id]);

  if (!item) return null;

  const chartData = generateChartData(item.basePrice);
  const itemHash = hashString(item.id + item.name);
  const floatValue = `0.${(itemHash % 99999).toString().padStart(5, '0')}`;
  const recentSales = Array.from({ length: 3 }, (_, idx) => {
    const rank = idx + 1;
    const variation = (itemHash % (rank * 13 + 7)) / 1000;
    return {
      id: rank,
      collector: `Collector_${(itemHash + rank * 47) % 1000}`,
      hoursAgo: rank * 2,
      salePrice: item.basePrice * (0.96 + variation)
    };
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-background border border-zinc-800 w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column: Artifact Display */}
            <div className="lg:col-span-7 p-8 lg:p-12 space-y-6 bg-surface-container-low">
              <div className="relative group rounded-[2rem] overflow-hidden aspect-[4/3] flex items-center justify-center p-12 bg-surface-variant/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                <img 
                  alt={item.name} 
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(133,173,255,0.3)]" 
                  src={item.image} 
                />
                
                <div className="absolute top-8 left-8 bg-tertiary-container/20 border border-tertiary-container/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                  <span className="text-tertiary text-[10px] font-black tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    ONLY 2 LEFT
                  </span>
                </div>

                <div className="absolute bottom-8 right-8 flex gap-3">
                  <button 
                    onClick={() => alert('Inspect mode coming soon!')}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md border border-white/5"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/5 ${isLiked ? 'bg-primary text-on-primary' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Price History Chart */}
              <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-headline font-bold text-lg">Market Performance</h3>
                    <p className="text-xs text-zinc-500">30-day price volatility and volume</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg text-[10px] bg-primary/20 text-primary font-bold">1M</button>
                    <button className="px-3 py-1 rounded-lg text-[10px] hover:bg-white/5 text-zinc-500 font-bold transition-colors">3M</button>
                    <button className="px-3 py-1 rounded-lg text-[10px] hover:bg-white/5 text-zinc-500 font-bold transition-colors">ALL</button>
                  </div>
                </div>
                
                <PriceChart data={chartData} />

                <div className="flex justify-between mt-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                  <span>OCT 01</span>
                  <span>OCT 10</span>
                  <span>OCT 20</span>
                  <span>TODAY</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="lg:col-span-5 p-8 lg:p-12 space-y-8 bg-background">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-2">{item.name}</h1>
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded border border-primary/20 font-bold uppercase tracking-widest">
                        {item.rarity} Grade
                      </span>
                      <span className="text-zinc-500 text-xs">•</span>
                      <span className="text-zinc-400 text-xs font-medium">Serial #0042-X</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-secondary font-headline text-4xl font-bold">
                    ${item.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-secondary/60 text-xs font-medium mt-1 uppercase tracking-widest">
                    {(item.change || 0) >= 0 ? '+' : ''}{(item.change || 0).toFixed(1)}% This week
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Forged from the volcanic core of the Midnight Wastes, this rare artifact features a mirror-finish edge. Its ergonomic handle is wrapped in rare nanoweave silk, ensuring a grip that never fails even in the highest tension digital conflicts.
                </p>

                {/* Stats Bento */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Wear</span>
                    <span className="font-headline font-bold text-on-surface">{item.wear || 'Factory New'}</span>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Float</span>
                    <span className="font-headline font-bold text-on-surface">{floatValue}</span>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Category</span>
                    <span className="font-headline font-bold text-primary">{item.category}</span>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Origin</span>
                    <span className="font-headline font-bold text-on-surface">The Void Crypt</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {onBuy ? (
                    <button 
                      onClick={() => { onBuy(item); onClose(); }}
                      className="flex-1 bg-primary text-on-primary font-headline font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(133,173,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                      Instant Buy
                    </button>
                  ) : (
                    <button
                      onClick={onClose}
                      className="flex-1 bg-primary text-on-primary font-headline font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(133,173,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                      Close
                    </button>
                  )}
                  <button
                    onClick={() => setIsLiked((prev) => !prev)}
                    className="flex-1 bg-transparent border border-zinc-800 text-white font-headline font-bold py-4 rounded-2xl hover:bg-white/5 active:scale-[0.98] transition-all"
                  >
                    {isLiked ? 'Watchlisted' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>

              {/* Recent Sales List */}
              <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
                <h3 className="font-headline font-bold text-lg mb-6">Recent Transactions</h3>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
                          <ShoppingBag className="text-secondary w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-100">{sale.collector}</div>
                          <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">{sale.hoursAgo} hours ago</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">${sale.salePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}.00</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Confirmed</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
