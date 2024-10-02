export interface Category {
  id: number;
  name: string;
  limit: number;
  spent: number;
}

export interface Expense {
  _id: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
}
