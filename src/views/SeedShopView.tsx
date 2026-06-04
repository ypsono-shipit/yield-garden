import React, { useState } from 'react';
import { ViewName, FlowerCard } from '../types';

interface Props {
  setActiveView: (view: ViewName) => void;
}

type FilterTab = 'All' | 'Staking' | 'Lending' | 'Vaults' | 'Stable Returns' | 'Liquidity';

const flowers: FlowerCard[] = [
  { id: '1', name: 'Aurora Staking', type: 'STAKING', emoji: '🌸', apy: 12.45, lockup: '30 Days Lock-up', risk: 'Low', seeds: 100 },
  { id: '2', name: 'Moonwell USDC', type: 'LENDING', emoji: '💐', apy: 8.72, lockup: 'Flexible', risk: 'Low', seeds: 75 },
  { id: '3', name: 'SunVault ETH', type: 'VAULT', emoji: '🌻', apy: 18.35, lockup: '90 Days', risk: 'Medium', seeds: 150 },
  { id: '4', name: 'Thorn LP', type: 'LIQUIDITY', emoji: '🌺', apy: 24.18, lockup: 'Flexible', risk: 'High', seeds: 200 },
  { id: '5', name: 'Pearl Stable', type: 'LENDING', emoji: '🌷', apy: 6.50, lockup: 'Flexible', risk: 'Low', seeds: 60 },
  { id: '6', name: 'Crystal Vault', type: 'VAULT', emoji: '🌹', apy: 15.80, lockup: '60 Days', risk: 'Medium', seeds: 125 },
  { id: '7', name: 'Sky Stake', type: 'STAKING', emoji: '🌼', apy: 10.20, lockup: '14 Days Lock-up', risk: 'Low', seeds: 80 },
  { id: '8', name: 'Storm LP', type: 'LIQUIDITY', emoji: '🪷', apy: 31.50, lockup: 'Flexible', risk: 'High', seeds: 250 },
];

const riskDot = (risk: FlowerCard['risk']) => {
  if (risk === 'Low') return <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />;
  if (risk === 'Medium') return <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />;
  return <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />;
};

const typeBadgeColor = (type: FlowerCard['type']) => {
  switch (type) {
    case 'STAKING': return 'bg-blue-100 text-blue-700';
    case 'LENDING': return 'bg-mint-dark text-primary';
    case 'VAULT': return 'bg-purple-100 text-purple-700';
    case 'LIQUIDITY': return 'bg-orange-100 text-orange-700';
  }
};

const filterMap: Record<FilterTab, FlowerCard['type'] | null> = {
  'All': null,
  'Staking': 'STAKING',
  'Lending': 'LENDING',
  'Vaults': 'VAULT',
  'Stable Returns': 'LENDING',
  'Liquidity': 'LIQUIDITY',
};

const tabs: FilterTab[] = ['All', 'Staking', 'Lending', 'Vaults', 'Stable Returns', 'Liquidity'];

export default function SeedShopView({ setActiveView }: Props) {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [lastUpdated, setLastUpdated] = useState(5);

  const filtered = flowers.filter(f => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Stable Returns') return f.risk === 'Low';
    return f.type === filterMap[activeTab];
  });

  return (
    <div className="flex flex-col h-full bg-mint overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-mint-dark px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('garden')}
            className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-primary hover:bg-mint-dark transition-colors font-medium"
          >
            ←
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#1A1A2E]">Choose a Flower</h1>
            <p className="text-xs text-gray-500">Pick a strategy to plant in your land.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-mint px-4 py-2 rounded-full border border-mint-dark">
          <span className="text-primary font-semibold text-sm">🌿 12,450</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-5">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 border border-mint-dark hover:bg-mint'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Flower grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {filtered.map(flower => (
            <div
              key={flower.id}
              className="flower-card bg-white rounded-2xl border border-mint-dark overflow-hidden shadow-sm"
            >
              {/* Flower illustration */}
              <div className="bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center py-6">
                <span style={{ fontSize: '52px', lineHeight: 1 }}>{flower.emoji}</span>
              </div>
              <div className="p-4">
                {/* Badge */}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${typeBadgeColor(flower.type)}`}>
                  {flower.type}
                </span>
                <h3 className="font-bold text-[#1A1A2E] mt-2 text-sm leading-tight">{flower.name}</h3>
                <div className="text-2xl font-extrabold text-primary mt-1">
                  {flower.apy}% <span className="text-xs font-medium text-gray-400">APY</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{flower.lockup}</div>
                {/* Risk */}
                <div className="flex items-center gap-1.5 mt-2">
                  {riskDot(flower.risk)}
                  <span className="text-xs text-gray-600 font-medium">{flower.risk} Risk</span>
                </div>
                {/* Seeds */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-primary text-sm font-bold">
                    🌿 {flower.seeds}
                  </div>
                  <button
                    onClick={() => setActiveView('flower-detail')}
                    className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Plant
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="bg-white rounded-xl border border-mint-dark px-4 py-3 flex items-center justify-between text-xs text-gray-500">
          <span>APY = Annual Percentage Yield. Rates updated in real time.</span>
          <span className="flex items-center gap-1 text-primary font-medium">
            Updated {lastUpdated}s ago
            <button
              className="hover:rotate-180 transition-transform duration-500"
              onClick={() => setLastUpdated(1)}
            >
              🔄
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
