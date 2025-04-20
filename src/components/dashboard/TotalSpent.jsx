import React from 'react';
import { Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const TotalSpent = ({ total }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-teal-100 p-3 rounded-full">
          <Wallet className="text-teal-600" size={24} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 ml-4">Total Spent</h2>
      </div>
      <p className="text-3xl font-bold text-teal-600">{formatCurrency(total)}</p>
      <p className="text-sm text-gray-500 mt-2">Across all categories</p>
    </div>
  );
};

export default TotalSpent;