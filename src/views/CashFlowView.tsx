import React, { useState } from 'react';
import { ViewName, IncomeItem, ExpenseItem } from '../types';

interface Props {
  setActiveView: (view: ViewName) => void;
}

const initialIncome: IncomeItem[] = [
  { id: '1', icon: '💼', label: 'Salary', amount: 3500 },
  { id: '2', icon: '💻', label: 'Freelance', amount: 1000 },
  { id: '3', icon: '📈', label: 'Investments', amount: 250 },
  { id: '4', icon: '🎁', label: 'Other', amount: 100 },
];

const initialExpenses: ExpenseItem[] = [
  { id: '1', icon: '🏠', label: 'Housing', amount: 950 },
  { id: '2', icon: '🍔', label: 'Food', amount: 500 },
  { id: '3', icon: '🚗', label: 'Transport', amount: 250 },
  { id: '4', icon: '🎬', label: 'Entertainment', amount: 200 },
  { id: '5', icon: '🛍️', label: 'Other', amount: 550 },
];

export default function CashFlowView({ setActiveView }: Props) {
  const [income, setIncome] = useState<IncomeItem[]>(initialIncome);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalIncome = income.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const available = totalIncome - totalExpenses;

  const updateIncomeAmount = (id: string, value: string) => {
    const num = parseFloat(value) || 0;
    setIncome(prev => prev.map(i => i.id === id ? { ...i, amount: num } : i));
  };

  const updateExpenseAmount = (id: string, value: string) => {
    const num = parseFloat(value) || 0;
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, amount: num } : e));
  };

  return (
    <div className="flex flex-col h-full bg-mint overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-mint-dark px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('garden')}
            className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center text-primary hover:bg-mint-dark transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#1A1A2E]">Monthly Cash Flow</h1>
            <p className="text-xs text-gray-500">Plan your income and expenses</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-mint px-4 py-2 rounded-full border border-mint-dark">
          <span className="text-primary font-semibold text-sm">🌿 12,450</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full">
        {/* Income Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-mint-dark overflow-hidden mb-4">
          <div className="px-5 py-3.5 bg-mint border-b border-mint-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <span className="font-bold text-[#1A1A2E]">INCOME</span>
            </div>
            <span className="text-xl font-bold text-primary">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {income.map((item) => (
              <div key={item.id} className="flex items-center px-5 py-3.5 hover:bg-gray-50 group">
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="flex-1 text-sm font-medium text-[#1A1A2E]">{item.label}</span>
                <div className="flex items-center gap-1 bg-mint rounded-lg px-3 py-1.5 border border-mint-dark">
                  <span className="text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateIncomeAmount(item.id, e.target.value)}
                    className="w-24 bg-transparent text-right text-sm font-semibold text-[#1A1A2E] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3">
            <button
              className="text-primary text-sm font-semibold hover:underline flex items-center gap-1"
              onClick={() => {
                const id = Date.now().toString();
                setIncome(prev => [...prev, { id, icon: '💵', label: 'New Source', amount: 0 }]);
              }}
            >
              + Add Income Source
            </button>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-mint-dark overflow-hidden mb-4">
          <div className="px-5 py-3.5 bg-red-50 border-b border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💸</span>
              <span className="font-bold text-[#1A1A2E]">EXPENSES</span>
            </div>
            <span className="text-xl font-bold text-red-500">${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {expenses.map((item) => (
              <div key={item.id} className="flex items-center px-5 py-3.5 hover:bg-gray-50">
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="flex-1 text-sm font-medium text-[#1A1A2E]">{item.label}</span>
                <div className="flex items-center gap-1 bg-red-50 rounded-lg px-3 py-1.5 border border-red-100">
                  <span className="text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateExpenseAmount(item.id, e.target.value)}
                    className="w-24 bg-transparent text-right text-sm font-semibold text-[#1A1A2E] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3">
            <button
              className="text-red-500 text-sm font-semibold hover:underline flex items-center gap-1"
              onClick={() => {
                const id = Date.now().toString();
                setExpenses(prev => [...prev, { id, icon: '🧾', label: 'New Expense', amount: 0 }]);
              }}
            >
              + Add Expense
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-primary rounded-2xl px-6 py-5 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium mb-1">Amount Available to Plant</p>
              <p className="text-3xl font-bold">${available.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="text-5xl opacity-80">🌿</div>
          </div>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white rounded-full h-full transition-all duration-500"
              style={{ width: `${Math.max(0, Math.min(100, (available / totalIncome) * 100))}%` }}
            />
          </div>
          <p className="text-green-200 text-xs mt-1.5">
            {totalIncome > 0 ? Math.round((available / totalIncome) * 100) : 0}% of income available
          </p>
        </div>

        {/* CTA */}
        <button
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-opacity-90 transition-all text-base flex items-center justify-center gap-2"
          onClick={() => setActiveView('seeds')}
        >
          🌿 Save & Continue
        </button>
      </div>
    </div>
  );
}
