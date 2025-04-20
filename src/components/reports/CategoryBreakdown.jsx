import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../types';

const CategoryBreakdown = ({ categoryData, totalSpent }) => {
  // Sort categories by spending (highest first)
  const sortedCategories = Object.entries(categoryData)
    .sort(([, a], [, b]) => b - a);
  
  if (sortedCategories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Breakdown</h2>
        <div className="text-center py-6 text-gray-500">
          <p>No category data available yet</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Breakdown</h2>
      <div className="space-y-4">
        {sortedCategories.map(([category, amount]) => {
          const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
          
          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: CATEGORY_COLORS[category] || '#64748b' }}
                  ></div>
                  <span className="font-medium text-gray-700">{category}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
                  <span className="text-gray-500 text-sm ml-2">({percentage.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: CATEGORY_COLORS[category] || '#64748b'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Total</span>
          <span className="font-bold text-gray-900">{formatCurrency(totalSpent)}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <button 
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors w-full"
          onClick={() => {
            // Prepare CSV data
            const headers = ['Category', 'Amount', 'Percentage'];
            const rows = sortedCategories.map(([category, amount]) => {
              const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
              return [category, amount.toFixed(2), percentage.toFixed(1) + '%'];
            });
            
            // Add total row
            rows.push(['Total', totalSpent.toFixed(2), '100%']);
            
            // Convert to CSV
            const csvContent = [
              headers.join(','),
              ...rows.map(row => row.join(','))
            ].join('\n');
            
            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_categories.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default CategoryBreakdown;