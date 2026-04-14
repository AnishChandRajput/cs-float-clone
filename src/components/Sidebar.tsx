import React from 'react';
import { LayoutDashboard, Scissors, HandIcon, Hammer, Bookmark, Settings, HelpCircle, SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  minPriceInput: string;
  maxPriceInput: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  onApplyFilters: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeFilter,
  onFilterChange,
  minPriceInput,
  maxPriceInput,
  onMinPriceChange,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  onApplyFilters
}) => {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-container-low border-r border-zinc-800/50 flex flex-col hidden lg:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-400/10 rounded-lg">
            <SlidersHorizontal className="text-blue-400 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-zinc-100 font-bold font-manrope">Advanced Filters</h3>
            <p className="text-zinc-500 text-[10px] font-label uppercase tracking-widest">Refine Artifacts</p>
          </div>
        </div>

        <nav className="space-y-1 mb-8">
          <button 
            onClick={() => onFilterChange?.('All Artifacts')}
            className={`${activeFilter === 'All Artifacts' ? 'bg-blue-400/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'} w-full px-4 py-3 flex items-center gap-3 font-manrope text-sm transition-all duration-200 ease-in-out`}
          >
            <LayoutDashboard className="w-5 h-5" />
            All Items
          </button>
          <button 
            onClick={() => onFilterChange?.('Knives')}
            className={`${activeFilter === 'Knives' ? 'bg-blue-400/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'} w-full px-4 py-3 flex items-center gap-3 font-manrope text-sm transition-all duration-200`}
          >
            <Scissors className="w-5 h-5" />
            Knives
          </button>
          <button 
            onClick={() => onFilterChange?.('Gloves')}
            className={`${activeFilter === 'Gloves' ? 'bg-blue-400/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'} w-full px-4 py-3 flex items-center gap-3 font-manrope text-sm transition-all`}
          >
            <HandIcon className="w-5 h-5" />
            Gloves
          </button>
          <button 
            onClick={() => onFilterChange?.('Rifles')}
            className={`${activeFilter === 'Rifles' ? 'bg-blue-400/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'} w-full px-4 py-3 flex items-center gap-3 font-manrope text-sm transition-all`}
          >
            <Hammer className="w-5 h-5" />
            Rifles
          </button>
          <button 
            onClick={() => onFilterChange?.('Stickers')}
            className={`${activeFilter === 'Stickers' ? 'bg-blue-400/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'} w-full px-4 py-3 flex items-center gap-3 font-manrope text-sm transition-all`}
          >
            <Bookmark className="w-5 h-5" />
            Stickers
          </button>
        </nav>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3">Price Range</label>
            <div className="flex gap-2">
              <input
                value={minPriceInput}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg text-xs py-2 px-3 focus:ring-1 focus:ring-primary/40 text-white outline-none"
                placeholder="Min"
                type="number"
                min="0"
              />
              <input
                value={maxPriceInput}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg text-xs py-2 px-3 focus:ring-1 focus:ring-primary/40 text-white outline-none"
                placeholder="Max"
                type="number"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-3">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-lg text-xs py-2 px-3 focus:ring-1 focus:ring-primary/40 text-zinc-300 outline-none bg-zinc-900"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        <button
          onClick={onApplyFilters}
          className="w-full mt-10 bg-primary text-on-primary py-3 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10"
        >
          Apply Filters
        </button>
      </div>

      <div className="mt-auto p-6 border-t border-zinc-800/50">
        <nav className="space-y-1">
          <button
            onClick={() => alert('Settings panel is coming soon.')}
            className="w-full text-left text-zinc-500 hover:text-zinc-200 px-4 py-2 flex items-center gap-3 font-manrope text-xs transition-all hover:bg-zinc-800/50"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => alert('Support is available at help@midnightexchange.example')}
            className="w-full text-left text-zinc-500 hover:text-zinc-200 px-4 py-2 flex items-center gap-3 font-manrope text-xs transition-all hover:bg-zinc-800/50"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </button>
        </nav>
      </div>
    </aside>
  );
}
