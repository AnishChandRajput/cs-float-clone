import React from 'react';
import { ItemCard } from '../components/ItemCard';
import type { Item } from '../data/items';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ItemDetailModal } from '../components/ItemDetailModal';
import { FundsModal } from '../components/FundsModal';
import { useMarket } from '../hooks/useMarket';
import { ArrowRight } from 'lucide-react';
import type { AppPage } from '../types/navigation';

interface MarketplaceProps {
  onNavigate: (page: AppPage) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onNavigate }) => {
  const { 
    items, 
    balance, 
    buyItem, 
    addFunds,
    activeFilter, 
    setActiveFilter, 
    searchQuery,
    setSearchQuery
  } = useMarket();
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [minPriceInput, setMinPriceInput] = React.useState('');
  const [maxPriceInput, setMaxPriceInput] = React.useState('');
  const [sortBy, setSortBy] = React.useState('featured');
  const [appliedMinPrice, setAppliedMinPrice] = React.useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = React.useState<number | null>(null);
  const [appliedSortBy, setAppliedSortBy] = React.useState('featured');
  const [fundsModalMode, setFundsModalMode] = React.useState<'deposit' | null>(null);

  const handleBuy = (item: Item) => {
    const success = buyItem(item);
    if (success) {
      alert(`Successfully purchased ${item.name}!`);
    } else {
      alert(`Insufficient funds for ${item.name}.`);
    }
  };

  const handleAddFunds = () => {
    setFundsModalMode('deposit');
  };

  const filters = ['All Artifacts', 'Legendary', 'Scarce', 'Factory New'];

  const applyAdvancedFilters = () => {
    const parsedMin = minPriceInput.trim() === '' ? null : Number(minPriceInput);
    const parsedMax = maxPriceInput.trim() === '' ? null : Number(maxPriceInput);

    if (parsedMin !== null && (Number.isNaN(parsedMin) || parsedMin < 0)) {
      alert('Minimum price must be a valid positive number.');
      return;
    }

    if (parsedMax !== null && (Number.isNaN(parsedMax) || parsedMax < 0)) {
      alert('Maximum price must be a valid positive number.');
      return;
    }

    if (parsedMin !== null && parsedMax !== null && parsedMin > parsedMax) {
      alert('Minimum price cannot be greater than maximum price.');
      return;
    }

    setAppliedMinPrice(parsedMin);
    setAppliedMaxPrice(parsedMax);
    setAppliedSortBy(sortBy);
  };

  const visibleItems = React.useMemo(() => {
    const filteredByPrice = items.filter((item) => {
      if (appliedMinPrice !== null && item.basePrice < appliedMinPrice) return false;
      if (appliedMaxPrice !== null && item.basePrice > appliedMaxPrice) return false;
      return true;
    });

    const sorted = [...filteredByPrice];
    if (appliedSortBy === 'price-asc') {
      sorted.sort((a, b) => a.basePrice - b.basePrice);
    } else if (appliedSortBy === 'price-desc') {
      sorted.sort((a, b) => b.basePrice - a.basePrice);
    } else if (appliedSortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [items, appliedMinPrice, appliedMaxPrice, appliedSortBy]);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar 
        balance={balance} 
        onNavigate={onNavigate} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddFunds={handleAddFunds}
      />
      
      <div className="flex pt-20">
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          minPriceInput={minPriceInput}
          maxPriceInput={maxPriceInput}
          onMinPriceChange={setMinPriceInput}
          onMaxPriceChange={setMaxPriceInput}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onApplyFilters={applyAdvancedFilters}
        />
        
        <main className="flex-1 lg:ml-64 p-8 min-h-screen">
          {/* Hero Section */}
          <section className="mb-12 relative rounded-3xl overflow-hidden group h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
            <img 
              alt="Hero Artifact" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD56i0T1xWc35q4nFjR-bh4zkq71J-teOoXAgBci5mupub4eaNmsCvJnIpUMsUU3kIkc2hzg71gQNLWmTfO6g1tlw5Nej0B2tCSTQOB9dA-NVW_tRypH9ueE6xCCXYSMUODxHc3EEKm2T2b1OMjD1DbkpHNKub0uZN2KgqPDsQ6mLPaSKV_fhArqRcSdGWM1tI2wUSWTBjpWaKgkN1hpdnEbZ-NkhsHHdRTDn6pGRJk_hxKgGjbCechO6KGZXiBo-Li-PIUIpW84Qs" 
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-12 max-w-2xl">
              <span className="text-secondary font-bold text-[10px] tracking-widest uppercase mb-4 font-label">Weekly Spotlight</span>
              <h1 className="text-5xl font-black font-headline tracking-tighter mb-6 leading-none">NEON OVERDRIVE COLLECTION</h1>
              <p className="text-zinc-300 font-body text-lg mb-8 max-w-md">The most sought-after digital artifacts of the season have arrived. Secure your piece of the metaverse.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => document.getElementById('grid-anchor')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2"
                >
                  Explore Collection <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Filters Bar */}
          <div id="grid-anchor" className="flex items-center justify-between mb-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`${
                    activeFilter === filter 
                    ? 'bg-secondary text-on-secondary' 
                    : 'bg-surface-container-high text-zinc-400 hover:text-zinc-100'
                  } px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-zinc-500">
              <span className="text-xs font-label">{visibleItems.length} items found</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {visibleItems.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onBuy={handleBuy} 
                onClick={(item) => setSelectedItem(item)} 
              />
            ))}
          </div>
        </main>
      </div>

      <ItemDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onBuy={handleBuy} 
      />

      <FundsModal
        isOpen={fundsModalMode !== null}
        mode={fundsModalMode ?? 'deposit'}
        balance={balance}
        onClose={() => setFundsModalMode(null)}
        onSubmit={(amount) => {
          addFunds(amount);
          return true;
        }}
      />
    </div>
  );
}
