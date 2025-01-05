import React, { useEffect, useState } from 'react';
import './kitchen.css';
import { showCategories } from '../hooks/show-categories';
import { CategoryModal } from '../components/modals/CategoryModal';
import { ItemModal } from '../components/modals/ItemModal';
import { CategoryCard } from '../components/card/CategoryCard';
import { EditCategoryModal } from '../components/modals/EditCategoryModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteCategoryConfirmationModal';
import { useNavigate } from 'react-router';
import { CategoryData } from '../interface/category-data';
import { useDeleteCategory } from '../hooks/delete-category';
import axios from 'axios';

const Kitchen: React.FC = () => {
  const { data } = showCategories();
  const categoryDataArray = Array.isArray(data) ? data : [];
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const navigate = useNavigate();
  const deleteCategory = useDeleteCategory();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:8080/auth/verify', { withCredentials: true });
      } catch (error) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setIsItemModalOpen(false);
  };

  const handleOpenItemModal = () => {
    setIsItemModalOpen(true);
    setIsCategoryModalOpen(false);
  };

  const handleCloseModals = () => {
    setIsCategoryModalOpen(false);
    setIsItemModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleEditCategory = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (selectedCategory && selectedCategory.id) {
      deleteCategory.mutate(selectedCategory.id.toString());
      handleCloseModals();
    }
  };

  const handleRedirectToCardapio = () => {
    window.open('/cardapio', '_blank');
  };

  return (
    <>
      <div className="kitchen-buttons-container">
        <button className="add-category-button" type="submit" onClick={handleOpenCategoryModal}>Adicionar categoria</button>
        <button className="add-item-button" type="submit" onClick={handleOpenItemModal}>Adicionar item</button>
        <button className="redirect-to-public-menu-button" onClick={handleRedirectToCardapio}>Ir para cardápio</button>
      </div>
      <div className="category-container">
        {categoryDataArray.map(categoryData => (
          <CategoryCard
            key={categoryData.id}
            name={categoryData.name}
            image={categoryData.image}
            onEdit={() => handleEditCategory(categoryData)}
            onDelete={() => handleDeleteCategory(categoryData)}
          />
        ))}
      </div>
      {isCategoryModalOpen && <CategoryModal isVisible={isCategoryModalOpen} handleClose={handleCloseModals} />}
      {isItemModalOpen && <ItemModal isVisible={isItemModalOpen} handleClose={handleCloseModals} />}
      {isEditModalOpen && selectedCategory && (
        <EditCategoryModal
          isVisible={isEditModalOpen}
          handleClose={handleCloseModals}
          initialData={selectedCategory}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isVisible={isDeleteModalOpen}
          handleClose={handleCloseModals}
          handleConfirm={confirmDeleteCategory}
        />
      )}
    </>
  );
};

export default Kitchen;
