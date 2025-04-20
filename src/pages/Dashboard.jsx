import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import TotalSpent from '../components/dashboard/TotalSpent';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { useExpenses } from '../context/ExpenseContext';

const Dashboard = () => {
  const { expenses, totalSpent, categoryTotals } = useExpenses();

  return (
    <PageContainer title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <TotalSpent total={totalSpent} />
        </div>
        <div className="lg:col-span-2">
          <CategoryChart categoryData={categoryTotals} />
        </div>
      </div>
      
      <div className="mb-6">
        <RecentTransactions expenses={expenses} limit={5} />
      </div>
    </PageContainer>
  );
};

export default Dashboard;