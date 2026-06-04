export type ViewName =
  | 'garden'
  | 'cashflow'
  | 'seeds'
  | 'flower-detail'
  | 'portfolio'
  | 'shop';

export interface IncomeItem {
  id: string;
  icon: string;
  label: string;
  amount: number;
}

export interface ExpenseItem {
  id: string;
  icon: string;
  label: string;
  amount: number;
}

export interface FlowerCard {
  id: string;
  name: string;
  type: 'STAKING' | 'LENDING' | 'VAULT' | 'LIQUIDITY';
  emoji: string;
  apy: number;
  lockup: string;
  risk: 'Low' | 'Medium' | 'High';
  seeds: number;
}

export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  bonus: string;
  price: number;
}

export interface PortfolioFlower {
  id: string;
  name: string;
  emoji: string;
  yieldPerHr: number;
}
