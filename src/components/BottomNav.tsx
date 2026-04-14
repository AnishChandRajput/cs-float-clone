import React from 'react';
import { ShoppingBag, LayoutDashboard, History, User } from 'lucide-react';
import type { AppPage } from '../types/navigation';

interface BottomNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
      <div className="bg-surface/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => onNavigate('market')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all ${currentPage === 'market' ? 'bg-primary/20 text-primary' : 'text-zinc-500'}`}
        >
          <ShoppingBag className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Market</span>
        </button>
        
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all ${currentPage === 'dashboard' ? 'bg-primary/20 text-primary' : 'text-zinc-500'}`}
        >
          <LayoutDashboard className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Inventory</span>
        </button>

        <button 
          onClick={() => onNavigate('orders')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all ${currentPage === 'orders' ? 'bg-primary/20 text-primary' : 'text-zinc-500'}`}
        >
          <History className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Orders</span>
        </button>

        <button 
          onClick={() => onNavigate('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all ${currentPage === 'profile' ? 'bg-primary/20 text-primary' : 'text-zinc-500'}`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
        </button>
      </div>
    </div>
  );
}
