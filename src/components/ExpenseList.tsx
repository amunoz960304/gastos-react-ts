import { useBudget } from '../hooks/useBudget';
import { useMemo } from 'react';
import ExpenseDetail from './ExpenseDetail';

const ExpenseList = () => {
  const {
    state: { expenses, currentCategory },
  } = useBudget();

  const isEmpty = useMemo(() => expenses.length === 0, [expenses]);

  const filteredExpenses = currentCategory
    ? expenses.filter((expense) => expense.category === currentCategory)
    : expenses;

  return (
    <div className='mt-10 bg-white shadow-lg rounded-lg p-10'>
      {isEmpty ? (
        <p className='text-gray-600 text-2xl font-bold'>No hay Gastos</p>
      ) : (
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>
            Listados de Gastos.
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail expense={expense} key={expense.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
