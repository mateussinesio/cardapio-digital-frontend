import React, { useEffect, useState } from 'react';
import './items.css';
import { ItemCard } from '../components/card/ItemCard';
import { showItems } from '../hooks/show-items';
import { useParams, useLocation, useNavigate } from 'react-router';
import { EditItemModal } from '../components/modals/EditItemModal'; // Novo modal de edição
import { DeleteConfirmationModal } from '../components/modals/DeleteItemConfirmationModal';
import { deleteItem } from '../hooks/delete-item';

const Items: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.startsWith('/cozinha/cardapio')) {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            }
        }
    }, [location.pathname, navigate]);

    if (!category) {
        return <div>Nenhuma categoria foi especificada.</div>;
    }

    const { data, isLoading, error } = showItems(category);
    const itemDataArray = Array.isArray(data) ? data : [];
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenDeleteModal = (itemId: string) => {
        setSelectedItemId(itemId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedItemId(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (selectedItemId) {
            deleteItem(selectedItemId);
            handleCloseDeleteModal();
        }
    };

    const handleOpenEditModal = (item: any) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const showDeleteButton = location.pathname.startsWith(`/cozinha/cardapio/${category}`);
    const showUpdateItemButton = location.pathname.startsWith(`/cozinha/cardapio/${category}`);

    if (isLoading) return <h1 className='verifyCategory'>Carregando...</h1>;
    if (error) return <h1 className='verifyCategory'>Erro ao carregar os items dessa categoria.</h1>;

    return (
        <>
            <div className="items-container">
                {itemDataArray.map(itemData => (
                    <ItemCard
                        key={itemData.id}
                        name={itemData.name}
                        image={itemData.image}
                        description={itemData.description}
                        price={itemData.price}
                        onDelete={() => handleOpenDeleteModal(itemData.id!)}
                        onUpdate={() => handleOpenEditModal(itemData)} // Adicione esta linha
                        showDeleteButton={showDeleteButton}
                        showUpdateItemButton={showUpdateItemButton}
                    />
                ))}
            </div>
            {isEditModalOpen && (
                <EditItemModal
                    isVisible={isEditModalOpen}
                    handleClose={handleCloseEditModal}
                    initialData={selectedItem} // Passe o item selecionado para o modal
                />
            )}
            {isDeleteModalOpen && (
                <DeleteConfirmationModal
                    isVisible={isDeleteModalOpen}
                    handleClose={handleCloseDeleteModal}
                    handleConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
};

export default Items;