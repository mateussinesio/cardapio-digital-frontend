import './menu.css'
import { CategoryCard } from '../components/card/MenuCategoryCard';
import { showCategories } from '../hooks/show-categories';

function Menu() {
  const { data } = showCategories();
  const categoryDataArray = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="menu-category-container">
        {categoryDataArray.map(categoryData => (
          <CategoryCard
            key={categoryData.id}
            name={categoryData.name}
            image={categoryData.image}
          />
        ))}
      </div>
    </>
  )
}

export default Menu