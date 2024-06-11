import { categories } from '../data/categories';
import { useBudget } from '../hooks/useBudget';

const FilterByCategory = () => {
  const { dispatch } = useBudget();
  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
      <form>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor='category'></label>
          <select
            className='bg-slate-100 p-3 flex-1 rounded'
            id='category'
            onChange={(e) =>
              dispatch({
                type: 'add-filter-category',
                payload: { id: e.target.value },
              })
            }
          >
            <option value=''>-- Todas las categorias --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {' '}
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterByCategory;
