import React from 'react';
import { ShoppingCart, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import type { Item } from '../data/items';
import { motion } from 'framer-motion';

interface ItemCardProps {
  item: Item;
  onBuy: (item: Item) => void;
  onClick: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onBuy, onClick }) => {
  const isPositive = (item.change || 0) >= 0;

  return (
    <motion.div 
      layout
      onClick={() => onClick(item)}
      className="artifact-card group bg-surface-container-low rounded-xl overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="absolute inset-0 artifact-glow" />
      
      <div className="h-64 bg-surface-container overflow-hidden relative p-8 flex items-center justify-center">
        {item.rarity !== 'Common' && (
          <div className="absolute top-4 right-4 z-20">
            <span className={`text-[10px] font-black py-1 px-3 rounded-full backdrop-blur-md border ${
              item.rarity === 'Scarce' ? 'bg-tertiary-container/20 text-tertiary border-tertiary/20' : 
              item.rarity === 'Legendary' ? 'bg-secondary/20 text-secondary border-secondary/20' :
              item.rarity === 'Rare' ? 'bg-primary/20 text-primary border-primary/20' :
              'bg-zinc-800/50 text-zinc-400 border-zinc-700/50'
            }`}>
              {item.rarity.toUpperCase()}
            </span>
          </div>
        )}
        
        <img 
          alt={item.name} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_25px_rgba(133,173,255,0.2)]" 
          src={item.image} 
        />
      </div>

      <div className="p-6 bg-surface-container-highest flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-on-surface font-bold text-lg font-headline">{item.name}</h3>
            <p className="text-zinc-500 text-[10px] font-label uppercase tracking-widest">{item.subName}</p>
          </div>
          <button className="text-zinc-500 hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Current Price</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-headline text-on-surface">
                ${item.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-[10px] font-bold flex items-center px-1.5 py-0.5 rounded ${
                isPositive ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
              }`}>
                {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {Math.abs(item.change || 0).toFixed(1)}%
              </span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBuy(item);
            }}
            className="w-10 h-10 rounded-lg bg-surface-bright flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all active:scale-90"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
