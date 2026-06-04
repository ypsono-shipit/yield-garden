import React, { useState } from 'react';
import { ViewName } from '../types';

interface Props {
  setActiveView: (view: ViewName) => void;
}

const flowers = [
  { emoji: '🌸', top: '15%', left: '20%', name: 'Cherry Blossom', yield: '+$0.045/hr' },
  { emoji: '🌺', top: '25%', left: '55%', name: 'Hibiscus', yield: '+$0.062/hr' },
  { emoji: '🌻', top: '45%', left: '30%', name: 'Sunflower', yield: '+$0.091/hr' },
  { emoji: '💐', top: '60%', left: '65%', name: 'Bouquet', yield: '+$0.033/hr' },
  { emoji: '🌷', top: '35%', left: '70%', name: 'Tulip', yield: '+$0.028/hr' },
  { emoji: '🌹', top: '70%', left: '25%', name: 'Rose', yield: '+$0.055/hr' },
  { emoji: '🌼', top: '50%', left: '50%', name: 'Daisy', yield: '+$0.021/hr' },
  { emoji: '🪷', top: '20%', left: '40%', name: 'Lotus', yield: '+$0.073/hr', active: true },
  { emoji: '🌿', top: '75%', left: '50%', name: 'Herb', yield: '+$0.015/hr' },
  { emoji: '🍀', top: '40%', left: '15%', name: 'Clover', yield: '+$0.019/hr' },
];

export default function GardenView({ setActiveView }: Props) {
  const [zoom, setZoom] = useState(1);
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-100 via-mint to-mint-dark relative overflow-hidden">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-mint opacity-60 pointer-events-none" />

      {/* Main garden area */}
      <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: 0 }}>
        {/* Floating clouds */}
        <div className="absolute top-8 left-16 text-4xl opacity-70 animate-pulse">☁️</div>
        <div className="absolute top-12 right-24 text-5xl opacity-60">☁️</div>
        <div className="absolute top-4 left-1/2 text-3xl opacity-50">☁️</div>

        {/* Isometric island container */}
        <div
          className="iso-scene relative"
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
        >
          <div className="iso-wrapper">
            {/* Grass top */}
            <div className="iso-top">
              {/* Grass texture dots */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-green-400 opacity-30"
                  style={{ top: `${15 + i * 12}%`, left: `${10 + i * 14}%` }}
                />
              ))}
            </div>
            {/* Dirt front face */}
            <div className="iso-front" />
            {/* Dirt right face */}
            <div className="iso-right" />

            {/* Flowers on island */}
            {flowers.map((flower) => (
              <div
                key={flower.name}
                className="iso-flower"
                style={{ top: flower.top, left: flower.left }}
                onMouseEnter={() => setTooltip(flower.name)}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => setActiveView('flower-detail')}
              >
                <span style={{ fontSize: '28px' }}>{flower.emoji}</span>
                {/* Active tooltip */}
                {flower.active && (
                  <div
                    className="absolute -top-14 left-1/2 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-medium whitespace-nowrap border border-mint-dark"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <div className="text-[#1A1A2E] font-semibold">Lotus</div>
                    <div className="text-primary">+$0.073 / hr</div>
                    <div className="text-gray-500">00:45:12</div>
                  </div>
                )}
                {/* Hover tooltip */}
                {tooltip === flower.name && !flower.active && (
                  <div
                    className="absolute -top-12 left-1/2 bg-white rounded-lg shadow-lg px-2 py-1.5 text-xs font-medium whitespace-nowrap border border-mint-dark z-50"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <div className="text-[#1A1A2E] font-semibold">{flower.name}</div>
                    <div className="text-primary">{flower.yield}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Yield card — bottom left */}
        <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg px-5 py-3.5 border border-mint-dark">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Live Yield</div>
          <div className="text-2xl font-bold text-[#1A1A2E]">$1.289 <span className="text-base font-medium text-gray-500">/ hr</span></div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-green-500 text-sm font-semibold">▲ 2.48%</span>
            <span className="text-gray-400 text-xs">today</span>
          </div>
        </div>

        {/* Controls — bottom right */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-3 items-end">
          <button
            className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2 text-sm"
            onClick={() => setActiveView('seeds')}
          >
            🌿 Harvest All
          </button>
          <div className="flex gap-2">
            <button
              className="bg-white shadow-md rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-mint transition-colors border border-mint-dark"
              onClick={() => setZoom(z => Math.min(z + 0.1, 1.6))}
            >
              +
            </button>
            <button
              className="bg-white shadow-md rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-mint transition-colors border border-mint-dark"
              onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
            >
              −
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
