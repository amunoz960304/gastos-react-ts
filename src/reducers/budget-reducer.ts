import { Expense, type Category } from '../types';

export type BudgetActions =
  | {
      type: 'add-budget';
      payload: { budget: number };
    }
  | {
      type: 'show-modal';
      payload: { modal: boolean };
    }
  | {
      type: 'add-expense';
      payload: { expense: Expense };
    }
  | {
      type: 'remove-expense';
      payload: { id: Expense['id'] };
    }
  | {
      type: 'get-expense-by-id';
      payload: { editingId: Expense['id'] };
    }
  | {
      type: 'update-expense';
      payload: { expense: Expense };
    }
  | {
      type: 'reset-app';
    }
  | {
      type: 'add-filter-category';
      payload: { id: Category['id'] };
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense['id'];
  currentCategory: Category['id'];
};

const initialBudget = (): number => {
  const lsBudget = localStorage.getItem('budget');
  return lsBudget ? +lsBudget : 0;
};

const initialExpenses = (): Expense[] => {
  const lsExpenses = localStorage.getItem('expenses');
  return lsExpenses ? JSON.parse(lsExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: '',
  currentCategory: '',
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: action.payload.modal,
      editingId: !action.payload.modal ? '' : state.editingId,
    };
  }

  if (action.type === 'add-expense') {
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expense],
      modal: false,
    };
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.editingId,
      modal: true,
    };
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      editingId: '',
    };
  }

  if (action.type === 'reset-app') {
    return {
      expenses: [],
      budget: 0,
      editingId: '',
      modal: false,
    };
  }

  if (action.type === 'add-filter-category') {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }

  return state;
};
