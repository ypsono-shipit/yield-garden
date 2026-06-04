import React, { useState } from 'react';
import { ViewName, ShopItem } from '../types';

interface Props {
  setActiveView: (view: ViewName) => void;
}

type ShopTab = 'Land' | 'Decorations' | 'Boosts' | 'Special';

const landItems: ShopItem[] = [
  { id: '1', name: 'Expand Plot', emoji: '🏞️', description: 'Increase the size of your land.', bonus: '+1 Plot', price: 5000 },
  { id: '2', name: 'Irrigation System', emoji: '⛲', description: 'Automate watering for all plants.', bonus: '+15% Growth Speed', price: 3000 },
  { id: '3', name: 'Magic Soil', emoji: '✨', description: 'Enchanted soil for maximum yield.', bonus: '+10% Yield', price: 4000 },
  { id: '4', name: 'Storage Shed', emoji: '🏚️', description: 'Store more seeds and harvests.', bonus: '+500 Storage', price: 2500 },
];

const decorationItems: ShopItem[] = [
  { id: '5', name: 'Stone Path', emoji: '🪨', description: 'Add a stone pathway to your garden.', bonus: '+5% Beauty', price: 800 },
  { id: '6', name: 'Garden Fountain', emoji: '⛲', description: 'A decorative centerpiece fountain.', bonus: '+Ambiance', price: 1500 },
  { id: '7', name: 'Lantern Post', emoji: '🪔', description: 'Illuminate your garden at night.', bonus: '+Night Yield', price: 600 },
  { id: '8', name: 'Wooden Fence', emoji: '🪵', description: 'Protect your land from intruders.', bonus: '+Security', price: 400 },
];

const boostItems: ShopItem[] = [
  { id: '9', name: 'Growth Potion', emoji: '🧪', description: 'Instantly speed up one flower growth.', bonus: '2x Speed (24h)', price: 1200 },
  { id: '10', name: 'Yield Elixir', emoji: '💧', description: 'Double yield for the next 12 hours.', bonus: '2x Yield (12h)', price: 1800 },
  { id: '11', name: 'Rare Seed Boost', emoji: '🌱', description: 'Increase rare seed drop chance.', bonus: '+25% Rare', price: 2200 },
  { id: '12', name: 'XP Multiplier', emoji: '⭐', description: 'Triple XP earnings for a day.', bonus: '3x XP (24h)', price: 900 },
];

const specialItems: ShopItem[] = [
  { id: '13', name: 'Golden Lotus', emoji: '🪷', description: 'Legendary flower with peak returns.', bonus: '50% APY Cap', price: 25000 },
  { id: '14', name: 'Dragon Egg', emoji: '🥚', description: 'Hatch a rare dragon guardian.', bonus: '+All Stats', price: 50000 },
];

const tabItems: Record<ShopTab, ShopItem[]> = {
  Land: landItems,
  Decorations: decorationItems,
  Boosts: boostItems,
  Special: specialItems,
};

const tabs: ShopTab[] = ['Land', 'Decorations', 'Boosts', 'Special'];

export default function ShopView({ setActiveView }: Props) {
  const [activeTab, setActiveTab] = useState<ShopTab>('Land');
  const [purchased, setPurchased] = useState<Set<string>>(new Set());

  const items = tabItems[activeTab];

  const handleBuy = (id: string) => {
    setPurchased(prev => new Set([...prev, id]));
  };

  return (
    <div className="flex flex-col h-full bg-mint overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-mint-dark px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Upgrade Your Land</h1>
            <p className="text-xs text-gray-500">Enhance your land and grow more.</p>
          </div>
          <div className="flex items-center gap-2 bg-mint px-4 py-2 rounded-full border border-mint-dark">
            <span className="text-primary font-semibold text-sm">🌿 12,450</span>
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 mt-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-mint text-gray-600 border border-mint-dark hover:bg-mint-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-5">
        {/* Shop grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {items.map(item => {
            const bought = purchased.has(item.id);
            return (
              <div
                key={item.id}
                className={`flower-card bg-white rounded-2xl border overflow-hidden shadow-sm ${
                  bought ? 'border-green-300' : 'border-mint-dark'
                }`}
              >
                {/* Item illustration */}
                <div className="bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center py-7 relative">
                  <span style={{ fontSize: '52px', lineHeight: 1 }}>{item.emoji}</span>
                  {bought && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Owned
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#1A1A2E] text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                  <div className="bg-mint rounded-lg px-2.5 py-1.5 mt-2 text-xs font-semibold text-primary">
                    {item.bonus}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-primary text-sm font-bold">
                      🌿 {item.price.toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleBuy(item.id)}
                      disabled={bought}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        bought
                          ? 'bg-green-100 text-green-600 cursor-default'
                          : 'bg-primary text-white hover:bg-opacity-90'
                      }`}
                    >
                      {bought ? '✓ Bought' : 'Buy'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lunar Season Pass banner */}
        <div className="bg-gradient-to-r from-[#1A1A2E] to-[#1A6B5A] rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🌙</span>
              <h3 className="text-white font-bold text-base">Lunar Season Pass</h3>
            </div>
            <p className="text-green-200 text-sm">
              Unlock exclusive decorations, boosts and more.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-white text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">🌸 12 Skins</span>
              <span className="text-white text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">⚡ 5 Boosts</span>
              <span className="text-white text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">🏆 Badges</span>
            </div>
          </div>
          <button className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition-all text-sm whitespace-nowrap ml-4 shadow-md border border-green-600">
            View Pass
          </button>
        </div>
      </div>
    </div>
  );
}
