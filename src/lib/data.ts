
// Types
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  month: string;
  year: number;
}

// Initial data
export const categories: Category[] = [
  { id: 'housing', name: 'Housing', color: '#A78BFA' },
  { id: 'food', name: 'Food', color: '#60A5FA' },
  { id: 'transportation', name: 'Transportation', color: '#34D399' },
  { id: 'entertainment', name: 'Entertainment', color: '#FBBF24' },
  { id: 'shopping', name: 'Shopping', color: '#F87171' },
  { id: 'healthcare', name: 'Healthcare', color: '#FB923C' },
  { id: 'utilities', name: 'Utilities', color: '#38BDF8' },
  { id: 'education', name: 'Education', color: '#4ADE80' },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 1200,
    description: 'Rent payment',
    date: '2023-08-01T00:00:00.000Z',
    category: 'housing',
  },
  {
    id: '2',
    amount: 85.5,
    description: 'Grocery shopping',
    date: '2023-08-03T00:00:00.000Z',
    category: 'food',
  },
  {
    id: '3',
    amount: 45,
    description: 'Gas refill',
    date: '2023-08-05T00:00:00.000Z',
    category: 'transportation',
  },
  {
    id: '4',
    amount: 15.75,
    description: 'Movie tickets',
    date: '2023-08-10T00:00:00.000Z',
    category: 'entertainment',
  },
  {
    id: '5',
    amount: 120,
    description: 'New shoes',
    date: '2023-08-15T00:00:00.000Z',
    category: 'shopping',
  },
  {
    id: '6',
    amount: 200,
    description: 'Doctor appointment',
    date: '2023-08-18T00:00:00.000Z',
    category: 'healthcare',
  },
  {
    id: '7',
    amount: 150,
    description: 'Electricity bill',
    date: '2023-08-20T00:00:00.000Z',
    category: 'utilities',
  },
  {
    id: '8',
    amount: 300,
    description: 'Online course',
    date: '2023-08-25T00:00:00.000Z',
    category: 'education',
  },
  {
    id: '9',
    amount: 65.3,
    description: 'Restaurant dinner',
    date: '2023-08-28T00:00:00.000Z',
    category: 'food',
  },
  {
    id: '10',
    amount: 35,
    description: 'Taxi ride',
    date: '2023-08-30T00:00:00.000Z',
    category: 'transportation',
  },
];

export const budgets: Budget[] = [
  {
    id: '1',
    categoryId: 'housing',
    amount: 1500,
    month: 'August',
    year: 2023,
  },
  {
    id: '2',
    categoryId: 'food',
    amount: 400,
    month: 'August',
    year: 2023,
  },
  {
    id: '3',
    categoryId: 'transportation',
    amount: 200,
    month: 'August',
    year: 2023,
  },
  {
    id: '4',
    categoryId: 'entertainment',
    amount: 100,
    month: 'August',
    year: 2023,
  },
  {
    id: '5',
    categoryId: 'shopping',
    amount: 150,
    month: 'August',
    year: 2023,
  },
];

// Helper functions
export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function calculateCategoryExpenses(transactions: Transaction[], categoryId: string): number {
  return transactions
    .filter((transaction) => transaction.category === categoryId)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}
