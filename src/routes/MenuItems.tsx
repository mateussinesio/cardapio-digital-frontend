import React, { useEffect } from 'react';
import './menu-items.css';
import { ItemCard } from '../components/card/MenuItemCard';
import { showItems } from '../hooks/show-items';
import { useParams, useLocation } from 'react-router';

const MenuItems: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/cozinha/cardapio')) {
        }
    }, [location.pathname]);

    if (!category) {
        return <div>Nenhuma categoria foi especificada.</div>;
    }

    const { data, isLoading, error } = showItems(category);
    const itemDataArray = Array.isArray(data) ? data : [];

    if (isLoading) return <h1 className='verifyCategory'>Carregando&hellip;</h1>;
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
                    />
                ))}
            </div>
        </>
    );
};

export default MenuItems;
