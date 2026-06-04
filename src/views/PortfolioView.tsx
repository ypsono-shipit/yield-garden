import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { ViewName, PortfolioFlower } from '../types';

interface Props {
  setActiveView: (view: ViewName) => void;
}

type TimeFilter = '1D' | '7D' | '30D' | '90D' | 'All';

const portfolioFlowers: PortfolioFlower[] = [
  { id: '1', name: 'Lavender', emoji: '🌸', yieldPerHr: 0.126 },
  { id: '2', name: 'Lotus', emoji: '🪷', yieldPerHr: 0.073 },
  { id: '3', name: 'Daisy', emoji: '🌼', yieldPerHr: 0.021 },
  { id: '4', name: 'Rose', emoji: '🌹', yieldPerHr: 0.065 },
  { id: '5', name: 'Tulip', emoji: '🌷', yieldPerHr: 0.034 },
  { id: '6', name: 'Sunflower', emoji: '🌻', yieldPerHr: 0.091 },
];

const allocationData = [
  { name: 'Staking', value: 45, color: '#1A6B5A' },
  { name: 'Lending', value: 30, color: '#4ade80' },
  { name: 'Vaults', value: 15, color: '#86efac' },
  { name: 'Liquidity', value: 10, color: '#d1d5db' },
];

function generateChartData(points: number) {
  return Array.from({ length: points }, (_, i) => ({
    day: i,
    value: Math.round(4000 + (Math.sin(i * 0.3) * 300) + i * 50 + Math.random() * 200),
  }));
}

const timeFilterPoints: Record<TimeFilter, number> = {
  '1D': 24,
  '7D': 30,
  '30D': 30,
  '90D': 45,
  'All': 60,
};

export default function PortfolioView({ setActiveView }: Props) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7D');

  const chartData = useMemo(
    () => generateChartData(timeFilterPoints[timeFilter]),
    [timeFilter]
  );

  const latestValue = chartData[chartData.length - 1]?.value ?? 5432;

  const statCards = [
    { label: 'Total Seeds', value: '12,450', icon: '🌿', sub: '' },
    { label: 'Total Value', value: '8,920.75', icon: '💎', sub: 'seeds' },
    { label: 'Total Value', value: '$5,432.18', icon: '💵', sub: 'USD' },
    { label: 'Live Yield', value: '$1.289/hr', icon: '📈', sub: '▲ 12.48%', subColor: 'text-green-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-mint overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-mint-dark px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">My Land</h1>
            <p className="text-xs text-gray-500">Your portfolio at a glance</p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-2xl border border-mint-dark">
            📊
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-5 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl border border-mint-dark px-4 py-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{card.icon}</span>
                <span className="text-xs text-gray-500 font-medium">{card.label}</span>
              </div>
              <p className="text-lg font-bold text-[#1A1A2E] leading-tight">{card.value}</p>
              {card.sub && (
                <p className={`text-xs mt-0.5 ${card.subColor ?? 'text-gray-400'} font-medium`}>{card.sub}</p>
              )}
            </div>
          ))}
        </div>

        {/* Growth chart */}
        <div className="bg-white rounded-2xl border border-mint-dark p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-[#1A1A2E]">$5,432.18</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-green-500 font-bold text-sm">▲ 12.48%</span>
                <span className="text-gray-400 text-xs">(7d)</span>
              </div>
            </div>
            {/* Time filters */}
            <div className="flex gap-1 bg-mint rounded-xl p-1">
              {(['1D', '7D', '30D', '90D', 'All'] as TimeFilter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    timeFilter === f
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A6B5A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1A6B5A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0FAF7" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #D1F0E8', borderRadius: '12px', fontSize: '12px' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1A6B5A"
                strokeWidth={2.5}
                fill="url(#greenGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Allocation chart */}
        <div className="bg-white rounded-2xl border border-mint-dark p-5 shadow-sm">
          <h3 className="font-bold text-[#1A1A2E] mb-4">Allocation</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, '']}
                  contentStyle={{ background: '#fff', border: '1px solid #D1F0E8', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {allocationData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#1A1A2E]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your Flowers */}
        <div className="bg-white rounded-2xl border border-mint-dark p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#1A1A2E]">Your Flowers</h3>
            <button
              className="text-primary text-sm font-semibold hover:underline"
              onClick={() => setActiveView('seeds')}
            >
              View All →
            </button>
          </div>
          <div className="scroll-x-container flex gap-3 pb-2">
            {portfolioFlowers.map(flower => (
              <button
                key={flower.id}
                onClick={() => setActiveView('flower-detail')}
                className="flower-card flex-shrink-0 bg-mint rounded-2xl border border-mint-dark px-4 py-4 w-32 text-center scroll-snap-align-start"
              >
                <span style={{ fontSize: '36px', lineHeight: 1 }}>{flower.emoji}</span>
                <p className="text-xs font-bold text-[#1A1A2E] mt-2">{flower.name}</p>
                <p className="text-xs text-primary font-semibold mt-0.5">
                  ${flower.yieldPerHr.toFixed(3)}/hr
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
