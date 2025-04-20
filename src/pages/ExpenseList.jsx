import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ExpenseListComponent from '../components/expenses/ExpenseList';
import { useExpenses } from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();

  return (
    <PageContainer title="Expense List">
      <ExpenseListComponent expenses={expenses} onDelete={deleteExpense} />
    </PageContainer>
  );
};

export default ExpenseList;