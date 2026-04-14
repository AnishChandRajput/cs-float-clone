import React from 'react';
import { Navbar } from '../components/Navbar';
import { useMarket } from '../hooks/useMarket';
import type { Item } from '../data/items';
import { TrendingUp, ShoppingBag, LayoutDashboard, Scissors, HandIcon, Hammer, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { ItemDetailModal } from '../components/ItemDetailModal';
import { FundsModal } from '../components/FundsModal';
import type { AppPage } from '../types/navigation';

interface DashboardProps {
  onNavigate: (page: AppPage) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { balance, inventory, history, sellItem, addFunds, withdrawFunds } = useMarket();
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [inventoryFilter, setInventoryFilter] = React.useState<'all' | 'knives' | 'gloves' | 'rifles'>('all');
  const [fundsModalMode, setFundsModalMode] = React.useState<'deposit' | 'withdraw' | null>(null);

  const filteredInventory = React.useMemo(() => {
    if (inventoryFilter === 'all') return inventory;
    if (inventoryFilter === 'knives') return inventory.filter((item) => item.category === 'Knife');
    if (inventoryFilter === 'gloves') return inventory.filter((item) => item.category === 'Gloves');
    if (inventoryFilter === 'rifles') return inventory.filter((item) => item.category === 'Rifle');
    return inventory;
  }, [inventory, inventoryFilter]);

  const handleSell = (id: string) => {
    const success = sellItem(id);
    if (success) {
      alert('Item sold successfully!');
    }
  };

  const handleAddFunds = () => {
    setFundsModalMode('deposit');
  };

  const handleWithdraw = () => {
    setFundsModalMode('withdraw');
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar balance={balance} onNavigate={onNavigate} onAddFunds={handleAddFunds} />
      
      <ItemDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      <FundsModal
        isOpen={fundsModalMode !== null}
        mode={fundsModalMode ?? 'deposit'}
        balance={balance}
        onClose={() => setFundsModalMode(null)}
        onSubmit={(amount) => {
          if (fundsModalMode === 'withdraw') {
            return withdrawFunds(amount);
          }

          addFunds(amount);
          return true;
        }}
      />

      <main className="pt-24 pb-12 px-6 max-w-[1920px] mx-auto flex flex-col gap-10">
        {/* Hero Stats Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between relative overflow-hidden h-64">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div>
              <h2 className="font-headline text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Available Balance</h2>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-headline font-extrabold text-on-surface">${balance.toLocaleString()}</span>
                <span className="text-secondary font-headline font-bold flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={handleWithdraw}
                className="flex-1 bg-surface-container-highest hover:bg-surface-bright transition-colors rounded-xl py-3 px-4 font-headline font-bold text-sm flex items-center justify-center gap-2"
              >
                Withdraw
              </button>
              <button 
                onClick={handleAddFunds}
                className="flex-1 bg-primary text-on-primary hover:bg-primary-fixed transition-colors rounded-xl py-3 px-4 font-headline font-bold text-sm flex items-center justify-center gap-2"
              >
                Deposit
              </button>
            </div>
          </div>

          <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between border-l-4 border-primary h-64">
            <div>
              <h2 className="font-headline text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Portfolio Value</h2>
              <span className="text-3xl font-headline font-bold text-on-surface">
                ${(inventory.reduce((acc, item) => acc + item.basePrice, 0)).toLocaleString()}
              </span>
            </div>
            <div className="mt-6 h-16 w-full">
              <div className="flex items-end gap-1 h-full">
                <div className="flex-1 bg-zinc-800 h-1/2 rounded-t-sm"></div>
                <div className="flex-1 bg-zinc-800 h-2/3 rounded-t-sm"></div>
                <div className="flex-1 bg-zinc-800 h-1/2 rounded-t-sm"></div>
                <div className="flex-1 bg-primary h-3/4 rounded-t-sm"></div>
                <div className="flex-1 bg-primary h-full rounded-t-sm"></div>
                <div className="flex-1 bg-primary h-5/6 rounded-t-sm"></div>
                <div className="flex-1 bg-secondary h-full rounded-t-sm"></div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-center items-center text-center h-64">
            <ShoppingBag className="text-primary w-10 h-10 mb-3" />
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Total Artifacts</span>
            <span className="text-4xl font-headline font-black text-on-surface mt-1">{inventory.length}</span>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Side Controls */}
          <aside className="xl:col-span-3">
            <div className="bg-surface-container-low rounded-xl p-6 sticky top-28">
              <h3 className="font-headline font-bold text-lg text-on-surface mb-6 flex items-center gap-2">
                <Filter className="text-primary w-5 h-5" />
                Inventory Filters
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setInventoryFilter('all')}
                  className={`${inventoryFilter === 'all' ? 'bg-primary/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200'} px-4 py-3 flex items-center justify-between group transition-all`}
                >
                  <span className="flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-sm font-medium">All Items</span>
                  </span>
                  <span className="text-xs bg-surface-container-highest px-2 py-0.5 rounded text-zinc-400">{inventory.length}</span>
                </button>
                <button
                  onClick={() => setInventoryFilter('knives')}
                  className={`${inventoryFilter === 'knives' ? 'bg-primary/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200'} px-4 py-3 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors rounded-lg`}
                >
                  <Scissors className="w-5 h-5" />
                  <span className="text-sm font-medium">Knives</span>
                </button>
                <button
                  onClick={() => setInventoryFilter('gloves')}
                  className={`${inventoryFilter === 'gloves' ? 'bg-primary/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200'} px-4 py-3 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors rounded-lg`}
                >
                  <HandIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Gloves</span>
                </button>
                <button
                  onClick={() => setInventoryFilter('rifles')}
                  className={`${inventoryFilter === 'rifles' ? 'bg-primary/10 text-blue-400 border-r-4 border-blue-400' : 'text-zinc-500 hover:text-zinc-200'} px-4 py-3 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors rounded-lg`}
                >
                  <Hammer className="w-5 h-5" />
                  <span className="text-sm font-medium">Rifles</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Inventory Grid */}
          <section className="xl:col-span-9 space-y-10">
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="font-headline font-black text-3xl text-on-surface">Your Inventory</h2>
                  <p className="text-zinc-500 mt-1">Manage and liquidate your digital assets.</p>
                </div>
              </div>

              {filteredInventory.length === 0 ? (
                <div className="bg-surface-container-low rounded-2xl p-12 text-center border-2 border-dashed border-zinc-800">
                  <span className="text-zinc-500 block mb-4 uppercase tracking-[0.2em] font-bold text-xs">Your inventory is empty</span>
                  <p className="text-zinc-400 mb-6">Head to the marketplace to acquire your first digital artifact.</p>
                  <button
                    onClick={() => onNavigate('market')}
                    className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-bold"
                  >
                    Go to Marketplace
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInventory.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      className="bg-surface-container rounded-xl overflow-hidden group hover:shadow-[0_8px_32px_rgba(133,173,255,0.12)] transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-surface-container-low flex items-center justify-center p-8 overflow-hidden">
                        <img alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src={item.image} />
                        <div className="absolute top-3 right-3 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{item.rarity}</span>
                        </div>
                      </div>
                      <div className="p-5 bg-surface-container-highest">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-headline font-bold text-on-surface">{item.name}</h4>
                          <span className="text-secondary font-bold text-sm font-headline">${item.basePrice.toLocaleString()}</span>
                        </div>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">{item.wear} • {item.category}</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="flex-1 bg-surface-bright hover:bg-zinc-700 transition-colors py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-on-surface"
                          >
                            Inspect
                          </button>
                          <button 
                            onClick={() => handleSell(item.id)}
                            className="flex-1 bg-tertiary-container hover:bg-tertiary transition-colors py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-white"
                          >
                            Sell
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="pt-10">
              <h2 className="font-headline font-black text-3xl text-on-surface mb-8">Recent Transactions</h2>
              <div className="bg-surface-container-low rounded-xl overflow-hidden border border-zinc-800/50">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-high/50 border-b border-zinc-800/50">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Artifact</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Type</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Date</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30">
                    {history.map((tx) => (
                      <tr key={tx.id} className="hover:bg-zinc-800/10 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-on-surface">{tx.itemName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs ${tx.type === 'BUY' ? 'text-zinc-400' : 'text-secondary'}`}>
                            {tx.type === 'BUY' ? 'Buy Order' : 'Sold'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-400">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-sm font-bold ${tx.type === 'BUY' ? 'text-on-surface' : 'text-secondary'}`}>
                            {tx.type === 'BUY' ? '-' : '+'}${tx.price.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {history.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm italic">
                          No recent transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
