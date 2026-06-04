import React, { useState, useEffect } from 'react';
import { ViewName } from '../types';

interface Props {
  setActiveView: (view: ViewName) => void;
}

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return {
    hrs: String(hrs).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
  };
}

export default function FlowerDetailView({ setActiveView }: Props) {
  const countdown = useCountdown(45 * 60 + 12); // 00:45:12
  const [harvested, setHarvested] = useState(false);

  return (
    <div className="flex flex-col h-full bg-mint overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-mint-dark px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('seeds')}
              className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-primary hover:bg-mint-dark transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#1A1A2E]">Lotus</h1>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
              <button className="text-red-400 hover:text-red-500">❤️</button>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 text-xl px-2">···</button>
        </div>
        <div className="mt-2">
          <span className="bg-mint-dark text-primary text-xs font-bold px-3 py-1 rounded-full">LENDING</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-xl mx-auto w-full">
        {/* Flower illustration */}
        <div className="bg-gradient-to-br from-mint via-white to-mint-dark rounded-3xl flex items-center justify-center py-12 mb-6 shadow-sm border border-mint-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary"
                style={{
                  width: `${20 + i * 8}px`,
                  height: `${20 + i * 8}px`,
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '120px', lineHeight: 1 }} className="relative z-10 drop-shadow-lg">🪷</span>
        </div>

        {/* Stats cards */}
        <div className="space-y-4 mb-6">
          {/* Live Yield */}
          <div className="bg-white rounded-2xl border border-mint-dark px-5 py-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Live Yield</p>
              <p className="text-2xl font-bold text-[#1A1A2E]">+$0.073 <span className="text-sm font-medium text-gray-400">/ hr</span></p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="text-green-500 font-bold text-lg">▲ 2.48%</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">from yesterday</p>
            </div>
          </div>

          {/* Growth Progress */}
          <div className="bg-white rounded-2xl border border-mint-dark px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Growth Progress</p>
              <span className="text-xs font-bold text-primary bg-mint px-2.5 py-1 rounded-full">Stage 3 of 5</span>
            </div>
            <div className="h-3 bg-mint-dark rounded-full overflow-hidden">
              <div className="progress-animated h-full bg-gradient-to-r from-primary to-green-400 rounded-full" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">0%</span>
              <span className="text-xs font-bold text-primary">68%</span>
              <span className="text-xs text-gray-400">100%</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-white rounded-2xl border border-mint-dark px-5 py-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">Time Remaining</p>
            <div className="flex items-center justify-center gap-3">
              {[
                { value: countdown.hrs, label: 'Hrs' },
                { value: countdown.mins, label: 'Mins' },
                { value: countdown.secs, label: 'Secs' },
              ].map(({ value, label }, idx) => (
                <React.Fragment key={label}>
                  {idx > 0 && <span className="text-3xl font-bold text-gray-300 -mt-2">:</span>}
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-primary to-green-700 text-white text-3xl font-mono font-extrabold w-20 h-16 flex items-center justify-center rounded-xl shadow-md countdown-tick">
                      {value}
                    </div>
                    <span className="text-xs text-gray-500 mt-1.5 font-medium">{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Harvest button */}
        <button
          className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all text-base flex items-center justify-center gap-2 mb-6 ${
            harvested
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-primary text-white hover:bg-opacity-90'
          }`}
          onClick={() => setHarvested(true)}
        >
          {harvested ? '✅ Harvested!' : '🌿 Harvest Now'}
        </button>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Earned', value: '$3,482' },
            { label: 'Planted On', value: 'May 14, 2024' },
            { label: 'Lock-up Period', value: '30 Days' },
            { label: 'Unlocks On', value: 'Jun 13, 2024' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl border border-mint-dark px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
              <p className="text-sm font-bold text-[#1A1A2E]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
