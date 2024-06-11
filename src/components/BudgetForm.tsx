import { useMemo, useState, type FormEvent } from 'react';
import { useBudget } from '../hooks/useBudget';

const BudgetForm = () => {
  const { dispatch } = useBudget();
  const [budget, setBudget] = useState(0);

  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'add-budget', payload: { budget } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'
        >
          Definir Presupuesto
        </label>
        <input
          type='number'
          className='w-full bg-white border border-gray-200 p-2'
          placeholder='Define tu presupuesto'
          name='budget'
          id='budget'
          value={budget}
          onChange={(e) => setBudget(e.target.valueAsNumber)}
        />
      </div>

      <input
        type='submit'
        value='Definir Presupuesto'
        className='bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase my-5 disabled:opacity-50'
        disabled={isValid}
      />
    </form>
  );
};

export default BudgetForm;
