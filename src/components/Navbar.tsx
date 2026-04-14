import React from 'react';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import type { AppPage } from '../types/navigation';

interface NavbarProps {
  balance: number;
  onNavigate: (page: AppPage) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onAddFunds?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  balance, 
  onNavigate, 
  searchQuery, 
  setSearchQuery,
  onAddFunds 
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(133,173,255,0.06)]">
      <nav className="flex items-center justify-between px-6 py-3 w-full max-w-[1920px] mx-auto">
        <div className="flex items-center gap-8">
          <span 
            className="text-2xl font-black italic tracking-tighter text-blue-400 font-headline cursor-pointer"
            onClick={() => onNavigate('market')}
          >
            Midnight Exchange
          </span>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-tight">
            <button 
              className="text-zinc-400 hover:text-zinc-100 transition-colors" 
              onClick={() => onNavigate('market')}
            >
              Market
            </button>
            <button 
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
              onClick={() => onNavigate('trade')}
            >
              Trade
            </button>
            <button 
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
              onClick={() => onNavigate('dashboard')}
            >
              Inventory
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
          <input 
            value={searchQuery ?? ''}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="w-full bg-surface-container-highest border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-zinc-600 transition-all text-white outline-none" 
            placeholder="Search digital artifacts..." 
            type="text"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] text-zinc-500 font-label uppercase tracking-widest font-bold">Balance</span>
            <span className="text-secondary font-bold font-headline">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          
          <button 
            onClick={() => onAddFunds?.()}
            disabled={!onAddFunds}
            className="bg-primary hover:bg-primary-fixed text-on-primary font-bold px-4 py-2 rounded-xl text-sm active:scale-95 duration-200 transition-all"
          >
            Add Funds
          </button>
          
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => alert('No new notifications.')}
              className="p-2 text-zinc-400 hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className="p-2 text-zinc-400 hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden ml-2 cursor-pointer">
              <img 
                alt="User" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFyD8Y0oEPKck2l8V2Nzih04T8i-BHyGqRZU-tQqbusFwHXxk-wKhxHu7BZ0LP32h9ThmnSfRCBTa8vsw7zHnQZJP_9qAhcOlTuMFumlgcBD_bhFppYaUxWwuduvcvGxXd03Dp3gzj9q_9_t9N1a3omotQFo71ZQtS_cjHRJtavMk0d_M8Ah6x_V2GqRP5Zym2ud7beylK4BV_W4EmoAYFy8fefki5Va5a38KU377HQGVp2YUMl73JCklUmEWDVSK7s7PW-QSfXzI" 
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
