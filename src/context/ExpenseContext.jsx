import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  
  // Load expenses from localStorage on initial render
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Calculate total spent
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate category totals
  const categoryTotals = expenses.reduce((totals, expense) => {
    const { category, amount } = expense;
    totals[category] = (totals[category] || 0) + amount;
    return totals;
  }, {});

  // Calculate monthly totals
  const monthlyTotals = expenses.reduce((totals, expense) => {
    const month = expense.date.substring(0, 7); // Format: YYYY-MM
    totals[month] = (totals[month] || 0) + expense.amount;
    return totals;
  }, {});

  // Add a new expense
  const addExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: crypto.randomUUID(),
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        totalSpent,
        categoryTotals,
        monthlyTotals,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};