import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ExpenseForm from '../components/expenses/ExpenseForm';

const AddExpense = () => {
  return (
    <PageContainer title="Add Expense">
      <ExpenseForm />
    </PageContainer>
  );
};

export default AddExpense;