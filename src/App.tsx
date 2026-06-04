import React, { useState } from 'react';
import { ViewName } from './types';
import GardenView from './views/GardenView';
import CashFlowView from './views/CashFlowView';
import SeedShopView from './views/SeedShopView';
import FlowerDetailView from './views/FlowerDetailView';
import PortfolioView from './views/PortfolioView';
import ShopView from './views/ShopView';

interface NavItem {
  id: ViewName;
  emoji: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'garden', emoji: '🌿', label: 'Garden' },
  { id: 'cashflow', emoji: '💸', label: 'Cash Flow' },
  { id: 'seeds', emoji: '🌱', label: 'Seeds' },
  { id: 'portfolio', emoji: '📊', label: 'Portfolio' },
  { id: 'shop', emoji: '🛒', label: 'Shop' },
];

export default function App() {
  const [activeView, setActiveView] = useState<ViewName>('garden');
  const [notifications, setNotifications] = useState(3);

  const handleNav = (view: ViewName) => setActiveView(view);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-mint font-sans">
      {/* Sidebar */}
      <aside className="flex flex-col w-16 bg-white border-r border-mint-dark shadow-sm z-20 flex-shrink-0">
        {/* Logo mark */}
        <div className="flex items-center justify-center h-16 border-b border-mint-dark">
          <span className="text-2xl">🌺</span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col items-center py-4 gap-1 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              title={item.label}
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
                activeView === item.id
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'hover:bg-mint text-gray-500 hover:text-primary'
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </nav>

        {/* Bottom settings */}
        <div className="flex flex-col items-center pb-4 gap-2 border-t border-mint-dark pt-3">
          <button
            title="Quests"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl text-gray-400 hover:bg-mint hover:text-primary transition-colors"
          >
            ⭐
          </button>
          <button
            title="Settings"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl text-gray-400 hover:bg-mint hover:text-primary transition-colors"
          >
            ⚙️
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b border-mint-dark px-6 h-14 flex-shrink-0 z-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-lg">🌺</span>
            <span className="font-extrabold text-sm tracking-widest text-[#1A1A2E] uppercase">
              Clash of Staking
            </span>
          </div>

          {/* Right side stats */}
          <div className="flex items-center gap-3">
            {/* Seeds */}
            <div className="flex items-center gap-1.5 bg-mint px-3.5 py-1.5 rounded-full border border-mint-dark">
              <span className="text-sm">🌿</span>
              <span className="text-sm font-bold text-primary">12,450</span>
            </div>
            {/* Gems */}
            <div className="flex items-center gap-1.5 bg-mint px-3.5 py-1.5 rounded-full border border-mint-dark">
              <span className="text-sm">💎</span>
              <span className="text-sm font-bold text-primary">8,025</span>
            </div>
            {/* Rank */}
            <div className="hidden md:flex items-center gap-1.5 bg-yellow-50 px-3.5 py-1.5 rounded-full border border-yellow-200">
              <span className="text-sm">🏆</span>
              <span className="text-sm font-semibold text-yellow-700">Garden Sage</span>
            </div>
            {/* Notification bell */}
            <button
              className="relative w-9 h-9 rounded-xl bg-mint flex items-center justify-center border border-mint-dark hover:bg-mint-dark transition-colors"
              onClick={() => setNotifications(0)}
            >
              <span className="text-lg">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center text-[10px]">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* View content */}
        <main className="flex-1 overflow-hidden">
          {activeView === 'garden' && <GardenView setActiveView={setActiveView} />}
          {activeView === 'cashflow' && <CashFlowView setActiveView={setActiveView} />}
          {activeView === 'seeds' && <SeedShopView setActiveView={setActiveView} />}
          {activeView === 'flower-detail' && <FlowerDetailView setActiveView={setActiveView} />}
          {activeView === 'portfolio' && <PortfolioView setActiveView={setActiveView} />}
          {activeView === 'shop' && <ShopView setActiveView={setActiveView} />}
        </main>
      </div>
    </div>
  );
}
