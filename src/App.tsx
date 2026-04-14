import { useState } from 'react';
import { Marketplace } from './pages/Marketplace';
import { Dashboard } from './pages/Dashboard';
import { BottomNav } from './components/BottomNav';
import type { AppPage } from './types/navigation';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('market');

  const renderPage = () => {
    switch(currentPage) {
      case 'market':
        return <Marketplace onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      default:
        return (
          <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-headline font-black mb-4 uppercase tracking-tighter">Coming Soon</h1>
            <p className="text-zinc-500 mb-8">This module is currently under development.</p>
            <button 
              onClick={() => setCurrentPage('market')}
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold"
            >
              Back to Marketplace
            </button>
          </div>
        );
    }
  };

  return (
    <div className="App overflow-x-hidden">
      {renderPage()}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
