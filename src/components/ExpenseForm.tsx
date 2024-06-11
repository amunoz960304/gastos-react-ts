import { useEffect, useState, type FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Error from './Error';
import { categories } from '../data/categories';
import { DraftExpense } from '../types';
import { useBudget } from '../hooks/useBudget';

const ExpenseForm = () => {
  const {
    dispatch,
    state: { editingId, expenses },
    remainingBudget,
  } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);

  useEffect(() => {
    if (editingId) {
      const [findExpense] = expenses.filter(
        (expense) => expense.id === editingId
      );
      setExpense(findExpense);
      setPreviousAmount(findExpense.amount);
    }
  }, [editingId]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes('') || expense.amount <= 0) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (expense.amount - previousAmount > remainingBudget) {
      setError('Has superado tu limite de gastos');
      return;
    }

    setError('');

    if (editingId) {
      dispatch({
        type: 'update-expense',
        payload: {
          expense: { ...expense, id: editingId },
        },
      });
    } else {
      dispatch({
        type: 'add-expense',
        payload: {
          expense: { ...expense, id: uuid() },
        },
      });
    }

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    });

    setPreviousAmount(0);
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        Nuevo Gasto
      </legend>

      {error && <Error error={error} />}
      <div className='flex flex-col gap-2'>
        <label className='text-xl' htmlFor='expense-name'>
          Nombre Gasto:
        </label>
        <input
          className='bg-slate-100 p-2'
          type='text'
          placeholder='Añade el Nombre del gasto'
          name='expense-name'
          id='expense-name'
          value={expense.expenseName}
          onChange={(e) =>
            setExpense({ ...expense, expenseName: e.target.value })
          }
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-xl' htmlFor='amount'>
          Cantidad:
        </label>
        <input
          className='bg-slate-100 p-2'
          type='number'
          placeholder='Añade la Cantidad del gasto'
          name='amount'
          id='amount'
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: +e.target.value })}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-xl' htmlFor='categorie'>
          Categoria:
        </label>
        <select
          className='bg-slate-100 p-2'
          name='categorie'
          id='categorie'
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        >
          <option value=''>Selecciona una Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Fecha Gasto:</label>
        <DatePicker
          className='bg-slate-100 py-2 border-0'
          value={expense.date}
          onChange={(value) => setExpense({ ...expense, date: value })}
        />
      </div>
      <input
        type='submit'
        value={editingId ? 'Editar Gasto' : 'Agregar Gasto'}
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
      />
    </form>
  );
};

export default ExpenseForm;
