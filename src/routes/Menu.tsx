import './menu.css'
import { CategoryCard } from '../components/card/CategoryCard';
import { showCategories } from '../hooks/show-categories';

function Menu() {
  const { data } = showCategories();
  const categoryDataArray = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="category-container">
        {categoryDataArray.map(categoryData => (
          <CategoryCard
            name={categoryData.name}
            image={categoryData.image}
          />
        ))}
      </div>
    </>
  )
}

export default Menu