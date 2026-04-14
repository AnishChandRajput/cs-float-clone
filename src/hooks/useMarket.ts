import { useState, useEffect } from 'react';
import { INITIAL_ITEMS } from '../data/items';
import type { Item } from '../data/items';

type Transaction = {
  id: number;
  type: 'BUY' | 'SELL';
  itemName: string;
  price: number;
  timestamp: string;
};

export function useMarket() {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('market_items');
    return savedItems ? JSON.parse(savedItems) : INITIAL_ITEMS;
  });

  const [balance, setBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem('user_balance');
    return savedBalance ? parseFloat(savedBalance) : 1240.50;
  });

  const [inventory, setInventory] = useState<Item[]>(() => {
    const savedInventory = localStorage.getItem('user_inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  const [history, setHistory] = useState<Transaction[]>(() => {
    const savedHistory = localStorage.getItem('transaction_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [activeFilter, setActiveFilter] = useState<string>('All Artifacts');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Price Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(currentItems => {
        const nextItems = currentItems.map(item => {
          // Random fluctuation between -1.5% and +1.5%
          const changePercent = (Math.random() * 3 - 1.5) / 100;
          const priceChange = item.basePrice * changePercent;
          const newPrice = Math.max(1, item.basePrice + priceChange);
          
          return {
            ...item,
            basePrice: newPrice,
            change: changePercent * 100
          };
        });
        localStorage.setItem('market_items', JSON.stringify(nextItems));
        return nextItems;
      });
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('user_balance', balance.toString());
    localStorage.setItem('user_inventory', JSON.stringify(inventory));
    localStorage.setItem('transaction_history', JSON.stringify(history));
  }, [balance, inventory, history]);

  const buyItem = (item: Item) => {
    if (balance >= item.basePrice) {
      setBalance(b => b - item.basePrice);
      setInventory(i => [...i, { ...item, id: `${item.id}-${Date.now()}` }]);
      setHistory(h => [{
        id: Date.now(),
        type: 'BUY',
        itemName: item.name,
        price: item.basePrice,
        timestamp: new Date().toISOString()
      }, ...h]);
      return true;
    }
    return false;
  };

  const sellItem = (inventoryId: string) => {
    const itemToSell = inventory.find(i => i.id === inventoryId);
    if (itemToSell) {
      setBalance(b => b + itemToSell.basePrice);
      setInventory(i => i.filter(item => item.id !== inventoryId));
      setHistory(h => [{
        id: Date.now(),
        type: 'SELL',
        itemName: itemToSell.name,
        price: itemToSell.basePrice,
        timestamp: new Date().toISOString()
      }, ...h]);
      return true;
    }
    return false;
  };

  const addFunds = (amount: number) => {
    setBalance(b => b + amount);
  };

  const withdrawFunds = (amount: number) => {
    if (balance >= amount) {
      setBalance(b => b - amount);
      return true;
    }
    return false;
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.subName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All Artifacts') return matchesSearch;
    if (activeFilter === 'Legendary') return matchesSearch && item.rarity === 'Legendary';
    if (activeFilter === 'Scarce') return matchesSearch && item.rarity === 'Scarce';
    if (activeFilter === 'Rare') return matchesSearch && item.rarity === 'Rare';
    if (activeFilter === 'Knives') return matchesSearch && item.category === 'Knife';
    if (activeFilter === 'Gloves') return matchesSearch && item.category === 'Gloves';
    if (activeFilter === 'Rifles') return matchesSearch && item.category === 'Rifle';
    if (activeFilter === 'Stickers') return matchesSearch && item.category === 'Stickers';
    if (activeFilter === 'Factory New') return matchesSearch && item.wear === 'Factory New';
    
    return matchesSearch;
  });

  return { 
    items: filteredItems, 
    allItems: items,
    balance, 
    inventory, 
    history, 
    buyItem, 
    sellItem, 
    addFunds, 
    withdrawFunds,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery
  };
}
