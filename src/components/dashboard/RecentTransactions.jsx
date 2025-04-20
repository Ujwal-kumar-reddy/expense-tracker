import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Tag } from 'lucide-react';

const RecentTransactions = ({ expenses, limit = 5 }) => {
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (recentExpenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
        <div className="text-center py-6 text-gray-500">
          <p>No transactions yet. Add your first expense!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {recentExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Tag className="text-gray-400" size={18} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-700">{expense.category}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(expense.date)}
                  {expense.notes && ` • ${expense.notes.substring(0, 20)}${expense.notes.length > 20 ? '...' : ''}`}
                </p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">{formatCurrency(expense.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;