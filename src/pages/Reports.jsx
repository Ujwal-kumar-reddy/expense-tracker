import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import MonthlyChart from '../components/reports/MonthlyChart';
import CategoryBreakdown from '../components/reports/CategoryBreakdown';
import { useExpenses } from '../context/ExpenseContext';

const Reports = () => {
  const { monthlyTotals, categoryTotals, totalSpent } = useExpenses();

  return (
    <PageContainer title="Reports">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <MonthlyChart monthlyData={monthlyTotals} />
        </div>
        <div>
          <CategoryBreakdown categoryData={categoryTotals} totalSpent={totalSpent} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Reports;